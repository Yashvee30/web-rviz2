// Connect to ROS2 bridge
const ros = new ROSLIB.Ros({ url: 'ws://localhost:9090' });

ros.on('connection', () => console.log('✅ Connected to ROSBridge'));
ros.on('error', e => console.error('❌ Connection error:', e));
ros.on('close', () => console.log('🔌 Connection closed'));

// Publisher for velocity
const cmdVel = new ROSLIB.Topic({
  ros,
  name: '/cmd_vel',
  messageType: 'geometry_msgs/msg/Twist'
});

// Canvas setup
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const scale = 40;
const cx = canvas.width / 2;
const cy = canvas.height / 2;

let mapPoints = [];
let robotPose = { x: 0, y: 0, yaw: 0 };
let avoidMode = false; // 🚗 auto avoidance mode flag
let avoidTimer = null;

// Subscribe to /odom
new ROSLIB.Topic({
  ros,
  name: '/odom',
  messageType: 'nav_msgs/msg/Odometry'
}).subscribe(msg => {
  robotPose.x = msg.pose.pose.position.x;
  robotPose.y = msg.pose.pose.position.y;
  const q = msg.pose.pose.orientation;
  const siny = 2 * (q.w * q.z + q.x * q.y);
  const cosy = 1 - 2 * (q.y * q.y + q.z * q.z);
  robotPose.yaw = Math.atan2(siny, cosy);
});

// Subscribe to /scan (LIDAR)
new ROSLIB.Topic({
  ros,
  name: '/scan',
  messageType: 'sensor_msgs/msg/LaserScan'
}).subscribe(msg => {
  let minRange = Infinity;
  const newPoints = [];

  for (let i = 0; i < msg.ranges.length; i++) {
    const r = msg.ranges[i];
    if (isNaN(r) || r <= 0.02 || r > msg.range_max) continue;
    if (r < minRange) minRange = r;

    const angle = msg.angle_min + i * msg.angle_increment;
    const wx = robotPose.x + r * Math.cos(angle + robotPose.yaw);
    const wy = robotPose.y + r * Math.sin(angle + robotPose.yaw);
    newPoints.push({ x: wx, y: wy });
  }

  mapPoints.push(...newPoints);

  const dangerDist = 0.25; // meters
  if (minRange < dangerDist && !avoidMode) {
    console.warn('⚠️ Obstacle detected — avoiding...');
    avoidMode = true;
    avoidObstacle();
  }
});

// 🚗 Obstacle avoidance behavior
function avoidObstacle() {
  // Turn left slightly
  cmdVel.publish(new ROSLIB.Message({
    linear: { x: 0, y: 0, z: 0 },
    angular: { x: 0, y: 0, z: 0.6 }
  }));

  clearTimeout(avoidTimer);
  avoidTimer = setTimeout(() => {
    avoidMode = false;
    cmdVel.publish(new ROSLIB.Message({
      linear: { x: 0.15, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: 0 }
    }));
    console.log('✅ Avoidance complete, resuming forward motion.');
  }, 1200);
}

// Draw loop
function draw() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 🟥 Draw LIDAR map points
  ctx.fillStyle = 'red';
  for (const p of mapPoints) {
    const x = cx + (p.x - robotPose.x) * scale;
    const y = cy - (p.y - robotPose.y) * scale;
    ctx.fillRect(x, y, 2, 2);
  }

  // 🔵 Draw robot arrow
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-robotPose.yaw);
  ctx.fillStyle = avoidMode ? 'orange' : 'blue';
  ctx.beginPath();
  ctx.moveTo(15, 0);
  ctx.lineTo(-10, -8);
  ctx.lineTo(-10, 8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  requestAnimationFrame(draw);
}
draw();

// 🎮 Joystick
const joystick = nipplejs.create({
  zone: document.getElementById('joystick'),
  mode: 'static',
  position: { left: '50%', top: '50%' },
  color: 'blue'
});

joystick.on('move', (evt, data) => {
  if (!data.direction || avoidMode) return;
  const linear = Math.cos(data.angle.radian) * data.distance / 50 * 0.25;
  const angular = -Math.sin(data.angle.radian) * 0.8;

  cmdVel.publish(new ROSLIB.Message({
    linear: { x: linear, y: 0, z: 0 },
    angular: { x: 0, y: 0, z: angular }
  }));
});

joystick.on('end', () => {
  cmdVel.publish(new ROSLIB.Message({
    linear: { x: 0, y: 0, z: 0 },
    angular: { x: 0, y: 0, z: 0 }
  }));
});

