# My_STV_YourTube_tracker

# LearnTube – YouTube Course Tracker

##  Description
LearnTube is a web app that lets users search for educational YouTube videos by topic and track their learning progress. Built with js, and a simple HTML/CSS frontend. It uses the YouTube Data API v3.

---

##  Features
-  Search for learning topics (e.g., "Python for Beginners")
-  Fetch videos from YouTube API
-  Mark videos as watched (optional extension)
-  Dockerized frontend/backend
-  Deployable with load balancer (HAProxy)

---
Build Instructions
To build the Docker image locally:

docker build -t learntube_tracker:latest learntube_trackerr:latest
Tag and push to Docker Hub:
docker tag docker tag learntube_tracker:latest arnold/learntube_tracker:latest
docker push docker push arnold/learntube_tracker:latest
Run Instructions (Web01 & Web02)
On Web01 and Web02:

docker pull arnold/learntube_tracker:latest
HAProxy Configuration (on Lb01)
frontend http-in
    bind *:80
    default_backend servers

backend servers
    balance roundrobin
    server web01 172.20.0.11:80 check
    server web02 172.20.0.12:80 check
    http-response set-header X-Served-By %[srv_name]
Install HAProxy inside lb-01
sudo apt update && sudo apt install -y haproxy
Reload and restart HAProxy
sudo vim /etc/haproxy/haproxy.cfg # apply changes
sudo service haproxy restart # restart haproxy cfg
Testing & Verification
Step 1: Access the Application via Load Balancer
curl -I http://localhost:8082
Use .env file:

docker run --env-file .env arnold/learntube_tracker:latest
Getting Started
Web browsers (Chrome, Edge, etc.)
An internet connection to fetch course expiry tracker from Youtube/v3 API

##  API Used
- [YouTube Data API v3](https://developers.google.com/youtube/v3)

---
### 2. Demo vedio (Youtube_link)


##  Local Setup
### 1. Clone this repo
```bash
git clone https://github.com/M-arnold-tech/My_STV_YourTube_tracker.git)
cd My_STV_Youtube_traccker







