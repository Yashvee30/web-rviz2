

<h1>Web RViz2</h1>

<p>
Web RViz2 is a <strong>web-based interface for RViz2</strong>, designed to make ROS2 visualization, mapping, localization, and navigation accessible to both technical and non-technical users. Unlike standard RViz2, which requires running multiple ROS2 commands manually, setting a fixed frame, and adding TFs, this project provides a <strong>simple, user-friendly web interface</strong>.
</p>

<p>All ROS2 commands run in the background, so users can control robots, build maps, and navigate entirely through the web browser.</p>

<div class="section">
<h2>Features</h2>
<ul>
    <li>Fully web-based interface for RViz2 visualization.</li>
    <li>Simple UI for easy operation; suitable for clients or non-technical users.</li>
    <li>Supports mapping, localization, and navigation.</li>
    <li>All ROS2 commands are automated in the backend.</li>
    <li>Works from any location using a standard web browser.</li>
    <li>Local demo video included for reference.</li>
</ul>
</div>

<div class="section">
<h2>Video Demo</h2>
<p>The demo video is included in the repository under the <code>video/</code> folder. To watch the demo:</p>
<pre>open video/demo.mp4</pre>
<p>(Or use your preferred video player)</p>
</div>

<div class="section">
<h2>Installation</h2>
<pre>
git clone git@github.com:Yashvee30/web-rviz2.git
cd web-rviz2

pip install -r requirements.txt

source /opt/ros/humble/setup.bash
export TURTLEBOT3_MODEL=waffle_pi
</pre>
</div>

<div class="section">
<h2>Execution Instructions</h2>
<p>Web RViz2 requires <strong>TurtleBot3 in Gazebo</strong>, <code>rosbridge_server</code> for WebSocket communication, and a simple HTTP server to serve the web UI.</p>

<h3>Main Commands</h3>
<pre>
# Launch TurtleBot3 in Gazebo
ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py

# Optional: Teleoperate robot
ros2 run turtlebot3_teleop teleop_keyboard

# Start ROS bridge for WebSocket
ros2 run rosbridge_server rosbridge_websocket

# Run HTTP server
python3 -m http.server 8080

# Open web UI
http://localhost:8080/index.html
</pre>

<h3>Alternative Commands</h3>
<pre>
export TURTLEBOT3_MODEL=waffle_pi

# Launch Gazebo world
ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py

# Launch ROS bridge
ros2 launch rosbridge_server rosbridge_websocket_launch.xml

# Start HTTP server on port 8000
python3 -m http.server 8000
</pre>

<h3>Working in Map Folder</h3>
<pre>
cd map

ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py
ros2 launch turtlebot3_bringup robot.launch.py
ros2 launch rosbridge_server rosbridge_websocket_launch.xml

# HTTP server on port 8008
python3 -m http.server 8008

# Web UI
http://localhost:8008/index.html
</pre>
</div>

<div class="section">
<h2>Usage</h2>
<ul>
    <li><strong>Build Map</strong> → Start mapping your environment.</li>
    <li><strong>Localization</strong> → Localize the robot on the map.</li>
    <li><strong>Navigate</strong> → Set goals for the robot and observe movement.</li>
</ul>
<p>All ROS2 commands run automatically in the backend.</p>
</div>

<div class="section">
<h2>Why Web RViz2?</h2>
<ul>
    <li>Traditional RViz2 is <strong>technical</strong>: users need to manually run commands, set fixed frames, and add TFs.</li>
    <li>Web RViz2 is <strong>user-friendly</strong>: all ROS2 commands run automatically with a simple web interface.</li>
    <li>Perfect for <strong>clients, office setups, or remote monitoring</strong>.</li>
</ul>
</div>

<div class="section">
<h2>Contributing</h2>
<p>Contributions are welcome! Feel free to submit issues or pull requests to improve the web interface, automation, or add new features.</p>
</div>

<div class="section">
<h2>License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>
</div>

</body>
</html>
