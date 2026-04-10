# Web RViz2

## Overview
Web RViz2 is a web-based interface for RViz2, designed to simplify ROS2 visualization, mapping, localization, and navigation.

Unlike traditional RViz2, which requires manually running multiple ROS2 commands, setting fixed frames, and configuring TFs, this project provides a simple and user-friendly web interface.

All ROS2 processes run in the background, allowing users to control robots, build maps, and navigate directly from a web browser.

---

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

