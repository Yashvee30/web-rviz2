# Web RViz2

## Overview
Web RViz2 is a web-based interface for RViz2, designed to simplify ROS2 visualization, mapping, localization, and navigation.

Unlike traditional RViz2, which requires manually running multiple ROS2 commands, setting fixed frames, and configuring TFs, this project provides a simple and user-friendly web interface.

All ROS2 processes run in the background, allowing users to control robots, build maps, and navigate directly from a web browser.

---


![ROS2](https://img.shields.io/badge/ROS2-Humble-blue)
![ROS Bridge](https://img.shields.io/badge/rosbridge-WebSocket-orange)
![Simulation](https://img.shields.io/badge/Gazebo-TurtleBot3-green)
![Language](https://img.shields.io/badge/Python-JS-yellow)
![License](https://img.shields.io/badge/License-MIT-lightgrey)


## Screenshot

![Web RViz2](Screenshot%20from%202026-04-10%2015-49-55.png)

## Features
- Web-based interface for RViz2 visualization  
- Simple UI suitable for non-technical users  
- Supports mapping, localization, and navigation  
- Backend automation of ROS2 commands  
- Accessible from any system via a web browser  
- Demo video included in the repository  

---

## Tech Stack

| Component        | Technology |
|-----------------|-----------|
| ROS Version     | ROS2 Humble |
| Communication   | rosbridge_server (WebSocket) |
| Frontend        | Web (HTML, JS) |
| Backend         | Python |
| Simulator       | TurtleBot3 Gazebo |

---

## Video Demo
The demo video is available in the repository:

```bash
open video/demo.mp4
```

---

## Installation

```bash
git clone git@github.com:Yashvee30/web-rviz2.git
cd web-rviz2
pip install -r requirements.txt
source /opt/ros/humble/setup.bash
export TURTLEBOT3_MODEL=waffle_pi
```

## Execution Instructions

This project requires:
- TurtleBot3 running in Gazebo
- rosbridge_server for WebSocket communication
- A local HTTP server to serve the web interface

---

## Main Commands
Launch TurtleBot3 in Gazebo
```bash
 ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py
```

Teleoperate robot
```bash
ros2 run turtlebot3_teleop teleop_keyboard
```

Start ROS bridge (WebSocket)

```bash
ros2 run rosbridge_server rosbridge_websocket
```

Run HTTP server

```bash
python3 -m http.server 8080
```

Open in browser:
```bash
http://localhost:8080/index.html
```
---
### Usage

Build Map → Start mapping the environment
Localization → Load a pre-built map and localize the robot
Navigate → Set goals and observe robot movement

All ROS2 commands are handled automatically in the backend.

---
### Why Web RViz2?
Traditional RViz2 is complex and requires manual setup
Web RViz2 simplifies everything through a browser interface
No need to configure TFs or run multiple commands manually
Suitable for clients, demos, and remote monitoring

