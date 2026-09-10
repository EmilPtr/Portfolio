export interface ProjectData {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demo?: string;
  video?: string;
  image: string;
}

export const projectsData: ProjectData[] = [
  {
    title: 'Tidal Tempest',
    subtitle: 'Combat Robot',
    description: 'A 1lb plastic Antweight combat robot with a 4WD vertical spinner archetype balanced for damage and control, built by team Vortex Robotics. Won 1st place at Wreckage at The Rex in 2026.',
    technologies: ['OnShape', 'Robust Design', 'Motors', 'Power Electronics', '3D Printing', 'Radio Control'],
    githubUrl: 'https://github.com/EmilPtr/Tidal-Tempest',
    video: 'https://drive.google.com/file/d/1OeF9fXCXvX5nwOAosB9dsVP-GYeSDM0M/preview',
    image: 'https://raw.githubusercontent.com/EmilPtr/Tidal-Tempest/743f93c3d5db19e5a855272414bc0afe85270dad/Media/Competition/Super_Aura_Photo.png'
  },
  {
    title: 'SpiderBot MKI',
    subtitle: 'Walking Robot',
    description: 'A 4-legged walking robot, uses a complicated state-machine based keyframe system to control the movement of the robot. Built as an entry into the world of walking robots! Its name is Crabley!',
    technologies: ['OnShape', 'Motors', 'Power Electronics', '3D Printing', 'BLE Protocol', 'Circuit Design', 'Robotics', 'Control Systems', 'Arduino Framework', 'C++', 'State Machine', 'Walking Robotics', 'Gait Control', 'Motion Interpolation', 'Easing Functions', 'Robust Architecture'],
    githubUrl: 'https://github.com/EmilPtr/SpiderBot-MKI',
    video: 'https://drive.google.com/file/d/1Sr7uhE_uGHzpxwUtORZNtASo_lV68MyY/preview',
    image: ''
  },
  {
    title: 'LimeArm MKI',
    subtitle: 'Robotic Arm',
    description: 'A 4-bar-linkage robotic arm built to be as resource and cost efficient as possible. Has full 4DOF range of motion and is controlled by an ESP32 microcontroller. Built for Hack Club Stasis',
    technologies: ['ESP32', 'Robotics', '3D Printing', 'CAD', 'Control Systems', 'Onshape', 'Electronics', 'Arduino Framework', 'C++'],
    githubUrl: 'https://github.com/EmilPtr/LimeArm-MKI',
    video: 'https://drive.google.com/file/d/1GkwxV1Ix10FxGRyfBV68P5_X3fs_jpAJ/preview',
    image: 'https://raw.githubusercontent.com/EmilPtr/LimeArm-MKI/refs/heads/main/PICTURES/IMG_0133.jpg'
  },
  {
    title: 'LMS',
    subtitle: 'Custom Media Server',
    description: 'A custom-built media server that is optimized for incredibly low-end devices. Has an old 2000s aesthetic and is built with a lightweight backend and frontend to minimize resource usage. It is built for Linux power users and works like a system utility, with specialized security features. Is currently running on a corebooted Acer Chromebook 315.',
    technologies: ['Linux', 'Caddy', 'HTML', 'CSS', 'JavaScript', 'Bash Scripting', 'Python', 'CLI', 'Web Development', 'Media Streaming', 'Architecture', 'Secure', 'Fail2Ban', 'Lightweight', 'Networking', 'Low Resource Usage', 'Multiplatform', 'Open Source'],
    githubUrl: 'https://github.com/EmilPtr/LMS',
    image: 'https://drive.google.com/file/d/1Fdk6rPBT8B9NjyFJZ6iKK3oPjlZppvAy/preview'
  },
];
