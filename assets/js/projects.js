/*
  ============================================================
  PORTFOLIO CONTENT
  Edit this file to change any text, add images or add projects.
  Images live in /images/<project-slug>/ . Add a file there and
  list it in that project's "gallery" (or set it as "cover").
  Any image that is missing shows a placeholder with its path,
  so you can see exactly which file to drop in.
  ============================================================
*/

window.SITE = {
  name: "Kene Okwoli",
  role: "Robotics and Embedded Systems Engineer",
  github: "https://github.com/KeneOkwoli",
  email: "",      // e.g. "kene@example.com"  (hidden while empty)
  linkedin: "",   // e.g. "https://www.linkedin.com/in/your-handle"  (hidden while empty)
  cv: ""          // e.g. "assets/Kene_Okwoli_CV.pdf"  (hidden while empty)
};

window.PROJECTS = [
  /* ---------------------------------------------------------- */
  {
    slug: "myomimic",
    title: "MyoMimic",
    subtitle: "Wireless EMG-Controlled Robotic Hand",
    category: "University",
    year: "2026",
    featured: true,
    short: "Five-channel surface EMG, on-device kNN gesture classification and an ESP-NOW link driving a tendon-driven InMoov hand.",
    lede: "BEng final year project. A wireless EMG-based robotic hand that replicates four human hand gestures in real time, built for around £251. Presented at CICET 2026.",
    tags: ["ESP32", "EMG", "kNN", "ESP-NOW", "InMoov"],
    github: "https://github.com/KeneOkwoli/MyoMimic",
    video: { id: "WmzaVyjg9OY", vertical: true },
    cover: "images/myomimic/cover.jpg",
    gallery: [
      { src: "images/myomimic/01.jpg", cap: "Fully assembled InMoov hand" },
      { src: "images/myomimic/02.jpg", cap: "EMG sensor placement around the forearm" },
      { src: "images/myomimic/03.jpg", cap: "Transmitter ESP32 and sensor wiring" },
      { src: "images/myomimic/04.jpg", cap: "Raw vs filtered EMG (MATLAB)" },
      { src: "images/myomimic/05.jpg", cap: "Tendon routing and servo mounting" },
      { src: "images/myomimic/06.jpg", cap: "Gesture classification results" }
    ],
    results: [
      { v: "83.33%", l: "Overall accuracy (35/42 trials)" },
      { v: "100%", l: "ESP-NOW delivery (361/361)" },
      { v: "~96%", l: "Noise reduction" },
      { v: "~£251", l: "Total build cost" }
    ],
    facts: {
      Hardware: "Dual ESP32, 5x OYMotion surface EMG sensors, 5x MG996R servos, 3D-printed InMoov hand (PLA), 5V/5A supply, I2C LCD",
      Software: "Arduino IDE, EMGFilters, ESP32Servo, MATLAB",
      Skills: "Biosignal processing, feature engineering, embedded ML, wireless comms, servo control, CAD assembly, soldering"
    },
    sections: [
      { h: "Overview", p: [
        "Five OYMotion surface EMG sensors sit circumferentially around the mid-forearm (8 to 12 cm above the wrist), targeting the dorsal, radial, dorsal-radial, ventral and ulnar muscle groups. Signals are filtered and classified on a transmitter ESP32, then sent over ESP-NOW to a receiver ESP32 that drives five MG996R servos through a tendon-driven InMoov hand.",
        "The system classifies four gestures (OpenPalm, Fist, Pinch and Peace) using an on-device k-Nearest Neighbour classifier operating on 15-dimensional feature vectors."
      ]},
      { h: "Per-gesture results", ul: [
        "<b>OpenPalm:</b> 100% (11/11)", "<b>Pinch:</b> 100% (10/10)",
        "<b>Peace:</b> 81.82% (9/11)", "<b>Fist:</b> 54.55% (6/11)"
      ]},
      { h: "Signal pipeline", ul: [
        "<b>Acquisition:</b> all five sensors on ADC1 pins (GPIO 33, 32, 34, 35, 36) to avoid the ADC2 and WiFi conflict, sampled at 500 Hz via timer interrupt.",
        "<b>Three-stage filtering:</b> 20 to 500 Hz bandpass with a 50 Hz notch, a Kalman filter (Q=500, R=2000) and a 5-sample moving average.",
        "<b>RMS:</b> computed over 200 ms windows, kept consistent between calibration and runtime after fixing a double-squaring bug.",
        "<b>15-dimensional features:</b> normalised per-channel RMS ratios, dorsal vs ventral and radial vs ulnar dominance, absolute RMS per channel and peak channel value.",
        "<b>Classification:</b> kNN with K=3 and squared Euclidean distance, 15 samples per gesture stored in RAM, plus temporal majority voting to suppress transient misclassifications."
      ]},
      { h: "Wireless and actuation", ul: [
        "<b>ESP-NOW:</b> change-only protocol, sending a gesture label only when the classification changes. 100% delivery achieved by calling <code>WiFi.begin()</code>, disabling power-save and setting maximum TX power.",
        "<b>Servo control:</b> a dispatch table maps each gesture to target angles; all five fingers move together with cosine ease-in/out transitions.",
        "<b>Hand:</b> I 3D printed the InMoov parts, routed the tendons and mounted the servos myself."
      ]},
      { h: "Outcome", p: [
        "The hand executed all four gestures with no stalling, binding or mechanical failure. The main limitation was Fist accuracy, caused by high trial-to-trial RMS variability during sustained high-intensity contraction, which is the clearest direction for improvement."
      ]},
      { h: "Key learnings", ul: [
        "Normalised channel ratios are more robust to sensor placement than absolute magnitudes alone.",
        "ADC1-only pin selection is essential on the ESP32 when WiFi or ESP-NOW is active.",
        "Kalman convergence lag (10 to 30 s) can cause a calibration/runtime mismatch if warm-up is too short.",
        "On-device kNN fits comfortably in ESP32 RAM (about 3.6 KB for 60 samples x 15 dimensions)."
      ]},
      { h: "Future development", ul: [
        "Improve Fist accuracy with more training data, MAV or waveform-length features, or a lightweight neural network.",
        "Store calibration vectors in flash to remove per-session recalibration.",
        "Add FSR grip-force feedback and more degrees of freedom."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "dor-15",
    title: "DOR-15",
    subtitle: "Biologically-Inspired Hexapod Robot",
    category: "University",
    year: "2025",
    featured: true,
    short: "Team-built six-legged robot with phototaxis, obstacle avoidance and a predator response, run on a Raspberry Pi Pico.",
    lede: "A hexapod with a rotating head and wings that navigates towards light, avoids obstacles and reacts to predators. Built as a multi-student team project using Agile sprints; I acted as sprint leader for several sprints.",
    tags: ["Raspberry Pi Pico", "PCA9685", "Fusion 360", "CircuitPython", "Team"],
    github: "https://github.com/KeneOkwoli/DOR-15",
    video: { id: "owJRCTvDJKI" },
    cover: "images/dor-15/cover.jpg",
    gallery: [
      { src: "images/dor-15/01.jpg", cap: "Assembled hexapod" },
      { src: "images/dor-15/02.jpg", cap: "Leg and servo assembly" },
      { src: "images/dor-15/03.jpg", cap: "Rotating head and sensor mounts" },
      { src: "images/dor-15/04.jpg", cap: "Electronics: Pico and PCA9685" },
      { src: "images/dor-15/05.png", cap: "Fusion 360 rotating component plate" },
      { src: "images/dor-15/06.png", cap: "Servo dictionary structure" },
      { src: "images/dor-15/07.png", cap: "Behaviour state machine" }
    ],
    results: [
      { v: "15", l: "Servos coordinated" },
      { v: "4", l: "Behaviours demonstrated" },
      { v: "Agile", l: "Sprint-based team delivery" }
    ],
    facts: {
      Hardware: "Raspberry Pi Pico, Adafruit PCA9685 servo driver, FS90MG servos, Adafruit BH1750 light sensor, ultrasonic sensors, PLA frame",
      Software: "CircuitPython, Thonny, Fusion 360, GitHub, Trello",
      Skills: "Servo kinematics, I2C, CAD, FDM printing, manual milling, mechanical assembly, sprint leadership"
    },
    sections: [
      { h: "Overview", p: [
        "DOR-15 is a six-legged robot designed around multi-servo coordination and gait generation, with the goal of navigating an environment in search of light sources (phototaxis). The project combined mechanical design, embedded control and multi-channel servo actuation as part of the Team Project module."
      ]},
      { h: "Goals", ul: [
        "Stable multi-leg walking",
        "Head rotation to improve object detection",
        "A predator response by flapping the wings",
        "Light sensing to detect and navigate towards light sources"
      ]},
      { h: "My contribution", ul: [
        "<b>CAD design:</b> led the initial design sprint, creating the rotating component plate and sensor mounts in Fusion 360, coordinating measurements across the team and iterating to resolve fit and tolerance issues.",
        "<b>Mechatronics:</b> soldered and mounted the Pico, servo driver, sensors and magnets; helped assemble the legs, wings and rotating head, resolving mechanical issues through redesign and post-processing.",
        "<b>Low-level programming:</b> built the servo-control architecture (12 leg servos plus head and wings) as a dictionary-based structure, with calibration, reset functions and initial gait tests; developed and validated the ultrasonic sensor code.",
        "<b>Behavioural programming:</b> implemented forward and turning locomotion, phototaxis with EMA filtering, head-scanning object avoidance and the predator response, and designed the finite state machine for full autonomy.",
        "<b>Leadership:</b> acted as sprint leader for several sprints, planning tasks and coordinating integration across sub-systems."
      ]},
      { h: "Outcome", p: [
        "The robot demonstrated all four behaviours: locomotion, phototaxis, object avoidance and predator response. The rotating head allowed dynamic scanning for both light and obstacles, and EMA-filtered light readings produced stable decisions. The full autonomous FSM was not completely integrated within the time available, but each behaviour ran reliably on its own."
      ]},
      { h: "Key learnings", ul: [
        "Small CAD misalignments cascade into assembly problems; allow for print tolerance early.",
        "Servo selection matters: mismatched servos (360 vs 180 degree, plastic vs metal gear) caused gait failures and forced hardware and code changes.",
        "A servo dictionary made it quick to reassign channels when a PCA9685 channel failed.",
        "Breaking gait into discrete positions and using a scalable FSM kept behaviour design maintainable."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "orbitallink",
    title: "OrbitalLink",
    subtitle: "Satellite-to-Ground Station Telemetry System",
    category: "University",
    year: "2026",
    featured: true,
    short: "Two STM32 Nucleo boards exchanging encrypted 5-byte telemetry over Zigbee, with EEPROM logging and live LDR sensing.",
    lede: "Embedded C firmware for two STM32 Nucleo-F411RE boards: one simulates a Low Earth Orbit satellite, the other a ground station that decrypts, logs and acknowledges every packet.",
    tags: ["STM32", "C / HAL", "Zigbee", "I2C", "AES-128"],
    github: "https://github.com/KeneOkwoli/Orbital-Link",
    video: { id: "cL9jd19TQ1M" },
    cover: "images/orbitallink/cover.png",
    gallery: [
      { src: "images/orbitallink/01.png", cap: "System architecture" },
      { src: "images/orbitallink/02.jpg", cap: "Satellite and ground station hardware" },
      { src: "images/orbitallink/03.png", cap: "PuTTY EEPROM telemetry dump" }
    ],
    results: [
      { v: "5 bytes", l: "Telemetry payload" },
      { v: "2 layers", l: "AES-128 + XOR encryption" },
      { v: "6", l: "Subsystems monitored" },
      { v: "14 bytes", l: "EEPROM memory map" }
    ],
    facts: {
      Hardware: "2x STM32 Nucleo-F411RE (ARM Cortex-M4), XBee Zigbee modules, 24LC64 EEPROM, LDR with 10k divider",
      Software: "C (HAL), STM32CubeIDE, STM32CubeMX, XCTU, PuTTY",
      Skills: "Embedded firmware, wireless protocols, interrupt-driven UART, ADC, I2C drivers, embedded security"
    },
    sections: [
      { h: "Overview", p: [
        "Robot A simulates an Earth observation satellite, reading onboard subsystem health data and a real ambient light sensor, then sending 5-byte encrypted telemetry packets to Robot B over a Zigbee RF link. Robot B decrypts the packet, persists health statuses, fault counts and orbital distance to a 24LC64 EEPROM, triggers severity-coded LED alerts and sends a 1-byte ACK back."
      ]},
      { h: "Process", ul: [
        "<b>Wireless protocol:</b> XBee modules in API mode with AES-128 network encryption; custom 0x10 Transmit Request frames built from scratch with manual checksum calculation, plus an application-layer XOR cipher (key 0x5A) as a second layer.",
        "<b>Payload:</b> subsystem ID, health status, 16-bit orbital distance split big-endian across two bytes, and a sender identifier. A 32-step table simulates LEO distance between 400 and 1200 km.",
        "<b>Live solar sensor:</b> an LDR on PA0 read via the 12-bit ADC, converted to a percentage and mapped to nominal, degraded or critical. Covering the LDR simulates the satellite entering Earth's shadow.",
        "<b>EEPROM:</b> I2C at 100 kHz with 2-byte addressing; a 14-byte map stores per-subsystem status, cumulative fault counts and the latest orbital distance.",
        "<b>LED alerts:</b> five distinct patterns on a single LED distinguish nominal, degraded, critical, transmit and ACK events."
      ]},
      { h: "Outcome", p: [
        "A working telemetry pipeline with live sensing, persistent logging, fault counting, dual-layer encryption and optical status signalling. Covering the LDR triggered a live critical alert at the ground station."
      ]},
      { h: "Key learnings", ul: [
        "Byte-order mismatches in multi-byte values corrupt data silently.",
        "Defining the EEPROM memory map before coding prevented address conflicts during integration.",
        "Both encryption layers need consistent keys; a mismatch passes checksums but yields garbage payloads.",
        "Bounds-checking the UART receive buffer fixed intermittent hard-fault resets on start-up."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "robotic-arm-pcb",
    title: "Robotic Arm Control PCB",
    subtitle: "Custom Controller Board for a 6-DOF Arm",
    category: "University",
    featured: true,
    short: "STM32-based board design integrating USB-C power, servo and DC motor drive, encoders, limit switches and thermal monitoring.",
    lede: "Schematic capture and layout for a single board that controls every joint of a 6-DOF robotic arm, designed for low-cost manufacture.",
    tags: ["PCB design", "DesignSpark", "STM32", "USB-C", "Motor drive"],
    github: "",
    cover: "images/robotic-arm-pcb/cover.png",
    gallery: [
      { src: "images/robotic-arm-pcb/01.png", cap: "Schematic: power and USB-C" },
      { src: "images/robotic-arm-pcb/02.png", cap: "Schematic: MCU and peripherals" },
      { src: "images/robotic-arm-pcb/03.png", cap: "Schematic: motor and sensor connectors" },
      { src: "images/robotic-arm-pcb/04.png", cap: "Board layout" }
    ],
    results: [
      { v: "100-pin", l: "STM32F107 MCU" },
      { v: "122.6 x 121.9 mm", l: "Board size" },
      { v: "6", l: "Limit switch inputs" }
    ],
    facts: {
      Hardware: "STM32F107VBT6, USB-C input, 5V to 3.3V regulator, BD6211FE2 H-bridge, MG90S/SG90 servos, microswitches, rotary encoders, LM92CIM temperature sensor",
      Software: "DesignSpark PCB",
      Skills: "Schematic capture, PCB layout, power regulation, sensor interfacing, design for manufacture"
    },
    sections: [
      { h: "Overview", p: [
        "A custom PCB for a 6-DOF robotic arm, integrating power management, a high-pin-count microcontroller, servos, a DC motor driver, limit switches, rotary encoders and a temperature sensor, with clean signal routing and room for expansion."
      ]},
      { h: "Process", ul: [
        "<b>Power:</b> USB-C for power and programming, with 5.1k CC resistors and decoupling; a 5V rail for servos and the motor driver and a regulated 3.3V rail for logic.",
        "<b>Microcontroller:</b> STM32F107VBT6 (ARM Cortex-M3) selected for GPIO headroom, with pins mapped for PWM, encoder channels, switch inputs and I2C.",
        "<b>Motor control:</b> PWM routing for the servos and a BD6211FE2 H-bridge for the base DC motor, giving full bidirectional rotation.",
        "<b>Sensors:</b> six microswitch inputs with pull-ups for homing, quadrature encoders for joint feedback and an LM92CIM on I2C for thermal monitoring, with its critical output used as an overheat trigger.",
        "<b>Layout:</b> components grouped by function (motors left, power top, encoders right, switches bottom, MCU central) with mounting holes in each corner.",
        "<b>Manufacture:</b> Gerbers produced and the board costed with PCBWay for a five-unit run. This board was not fabricated."
      ]},
      { h: "Key learnings", ul: [
        "USB-C needs specific CC resistor configuration and noise filtering.",
        "High-pin-count MCUs demand early pin planning.",
        "Grouping components by function leads to cleaner routing and easier debugging.",
        "Manufacturability has to be considered from the first layout decisions."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "digital-clock",
    title: "Digital Clock",
    subtitle: "RTC Clock with Adaptive Display and Custom PCB",
    category: "Personal",
    short: "Beetle RP2040 clock with a DS3231 RTC, a custom I2C driver for the display and a PCB I designed and had fabricated.",
    lede: "An accurate desk clock that dims its display in dark rooms, built on a custom PCB fabricated through PCBWay and housed in a printed enclosure.",
    tags: ["RP2040", "DS3231", "I2C", "PCB", "Enclosure"],
    github: "https://github.com/KeneOkwoli/ClockProject",
    cover: "images/digital-clock/cover.jpg",
    gallery: [
      { src: "images/digital-clock/01.jpg", cap: "Finished clock" },
      { src: "images/digital-clock/02.jpg", cap: "Assembled PCB" },
      { src: "images/digital-clock/03.jpg", cap: "Enclosure and battery compartment" },
      { src: "images/digital-clock/04.jpg", cap: "Internal layout" },
      { src: "images/digital-clock/05.png", cap: "PCB layout in DesignSpark" },
      { src: "images/digital-clock/06.png", cap: "Schematic" },
      { src: "images/digital-clock/07.jpg", cap: "Clock in a dark room" }
    ],
    facts: {
      Hardware: "Beetle RP2040, DS3231 RTC, M5Stack 7-segment unit, LDR divider, custom PCB, 9V battery, PLA enclosure",
      Software: "Arduino IDE, DesignSpark PCB",
      Skills: "Driver development, PCB design and bring-up, enclosure design, soldering"
    },
    sections: [
      { h: "Overview", p: [
        "A digital clock on a Beetle RP2040 that keeps accurate time with a DS3231 RTC and adjusts its display when the surrounding environment is dark."
      ]},
      { h: "Process", ul: [
        "<b>Hardware:</b> DS3231 and display on the I2C bus, with an LDR voltage divider for analogue light readings.",
        "<b>Custom I2C driver:</b> the M5Stack 7-segment unit had no Arduino support, so I wrote my own command set using the Wire library to set digits, update segments, control brightness and refresh the display.",
        "<b>Adaptive display:</b> a light threshold switches the display to a fade transition in dark rooms.",
        "<b>PCB and enclosure:</b> designed a small PCB to mount the RP2040, RTC and LDR, had it fabricated through PCBWay and brought it up; the PLA enclosure has a removable divider so the battery can be changed without exposing the electronics."
      ]},
      { h: "Key learnings", ul: [
        "Enclosures must anticipate tolerances; early prints exposed screw alignment and fit issues.",
        "A dedicated PCB improved cable management, reduced noise on analogue inputs and simplified debugging."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "rp2040-music-box",
    title: "RP2040 Music Box",
    subtitle: "Register-Level Light, Sound and Motion",
    category: "University",
    short: "Forth on a Maker RP2040 synchronising PWM tones, binary LED output and a servo pointer to play a full song.",
    lede: "An embedded music box written with low-level register programming: LEDs show each note's ASCII value in binary, a buzzer plays the pitch and a servo points to the note.",
    tags: ["RP2040", "Forth", "PWM", "Registers", "Oscilloscope"],
    github: "https://github.com/KeneOkwoli/Embedded-Systems",
    cover: "images/rp2040-music-box/cover.jpg",
    gallery: [
      { src: "images/rp2040-music-box/01.jpg", cap: "LED binary output" },
      { src: "images/rp2040-music-box/02.jpg", cap: "Assembled music box" },
      { src: "images/rp2040-music-box/03.jpg", cap: "PWM waveform on the oscilloscope" }
    ],
    facts: {
      Hardware: "Maker RP2040, 8 LEDs, piezo buzzer, servo, custom note sheet",
      Software: "Forth (Zeptoforth, zeptocom.js)",
      Skills: "GPIO bitmasking, PWM register configuration, duty-cycle maths, oscilloscope validation"
    },
    sections: [
      { h: "Process", ul: [
        "<b>Light:</b> eight GPIO pins driven through a single bitmask to display each note's ASCII value in binary, verified against a truth table.",
        "<b>Sound:</b> PWM registers (CSR, DIV, TOP, CC) configured per note in octave 4, for example C4 at 261.6 Hz, validated with an oscilloscope and tuner apps.",
        "<b>Motion:</b> servo duty cycles calculated from the 20 ms period, then tuned iteratively to match the servo's physical limits.",
        "<b>Integration:</b> calling a note triggers LEDs, servo and buzzer together; verses are chained into a complete performance of Twinkle Twinkle Little Star."
      ]},
      { h: "Key learnings", ul: [
        "Register-level programming builds a real understanding of PWM frequency and duty cycle.",
        "Real servos rarely match theoretical duty cycles; iterative tuning is essential.",
        "Oscilloscopes give essential evidence when validating generated signals."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "cnn-sign-language",
    title: "CNN Sign Language Recognition",
    subtitle: "Deep Learning for Static ASL Gestures",
    category: "University",
    short: "A PyTorch CNN decoding ASL letters into words, evaluated on validation data, test images and live webcam input.",
    lede: "A convolutional neural network that classifies static ASL hand gestures and reconstructs words, with a focus on understanding generalisation and domain shift outside the dataset.",
    tags: ["PyTorch", "CNN", "OpenCV", "Computer vision"],
    github: "https://github.com/KeneOkwoli/CNN-Based-Sign-Language-Recognition",
    cover: "images/cnn-sign-language/cover.jpg",
    gallery: [
      { src: "images/cnn-sign-language/01.png", cap: "Training and validation curves" },
      { src: "images/cnn-sign-language/02.png", cap: "Word decoding from test images" },
      { src: "images/cnn-sign-language/03.png", cap: "Webcam testing" }
    ],
    results: [
      { v: "94%", l: "Classification accuracy" },
      { v: "27", l: "Classes (A to Z + space)" },
      { v: "48 x 48", l: "Greyscale input" }
    ],
    facts: {
      Software: "Python, PyTorch, NumPy, OpenCV, Pygame",
      Hardware: "Google Colab, NVIDIA A100 GPU",
      Skills: "Deep learning, dataset preprocessing, model evaluation, debugging ML pipelines"
    },
    sections: [
      { h: "Process", ul: [
        "<b>Data:</b> an early dataset with uniform black backgrounds led the model to rely on background features, so I switched to a more varied dataset. Images were converted to greyscale and resized to 48 x 48.",
        "<b>Architecture:</b> three convolutional blocks (3 x 3 kernels, batch normalisation, ReLU, max-pooling) with dropout, a 512-neuron dense layer and a 27-class output.",
        "<b>Training:</b> Adam and cross-entropy loss, tracking accuracy, precision and recall on a held-out validation split."
      ]},
      { h: "Evaluation", ul: [
        "<b>Validation:</b> metrics improved steadily without severe overfitting.",
        "<b>Pre-captured images:</b> decoded words such as \"hello\", with confusion between similar gestures such as L and Y.",
        "<b>Webcam:</b> accuracy dropped due to domain shift (lighting, angle and background) rather than classic overfitting."
      ]},
      { h: "Key learnings", ul: [
        "High validation accuracy does not guarantee real-world robustness.",
        "Dataset diversity is critical for deployment.",
        "Temporal aggregation across frames (as later used in MyoMimic) improves stability."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "behaviour-based-robot",
    title: "Behaviour-Based Robot",
    subtitle: "Resource Seeking and Navigation in Webots",
    category: "University",
    year: "2024",
    short: "A Khepera III robot in Webots that manages hunger, thirst and health using a layered FSM and colour-based perception.",
    lede: "An autonomous robot written in C that navigates, avoids obstacles, escapes predators and seeks food and water to keep itself alive.",
    tags: ["Webots", "C", "FSM", "Behavioural robotics"],
    github: "https://github.com/KeneOkwoli/WeBots",
    cover: "images/behaviour-based-robot/cover.png",
    gallery: [
      { src: "images/behaviour-based-robot/01.png", cap: "Webots terminal output" },
      { src: "images/behaviour-based-robot/02.png", cap: "Simulation environment" },
      { src: "images/behaviour-based-robot/03.png", cap: "Resource seeking in progress" }
    ],
    facts: {
      Software: "Webots, C, Khepera III API",
      Hardware: "Simulated: 3 RGB cameras, 8 IR proximity sensors, receiver module",
      Skills: "Behaviour-based architectures, perception thresholds, state logic, simulation testing"
    },
    sections: [
      { h: "Process", ul: [
        "<b>Architecture:</b> a finite state machine with Free Roam, Search Food, Search Water, Escape Predator and Dead states, driven by internal variables and environmental cues.",
        "<b>Perception:</b> three RGB cameras detect food (dark green) and water (blue), with thresholds retuned after early runs confused ground colours with food.",
        "<b>Obstacle avoidance:</b> IR proximity readings trigger a reverse and pivot.",
        "<b>Homeostasis:</b> hunger, thirst and health interact; health regenerates when needs are met and depletes when both are critical.",
        "<b>Predators:</b> a receiver detects red predators, reducing health and triggering an escape behaviour."
      ]},
      { h: "Key learnings", ul: [
        "Subsumption-style layering simplifies real-time decisions.",
        "Colour vision needs careful threshold tuning to avoid false positives.",
        "Fusing IR, camera and receiver data improves environmental awareness."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "scara-kinematics",
    title: "SCARA Forward Kinematics",
    subtitle: "DH Analysis and Teaching-Mode GUI",
    category: "University",
    short: "Hand-derived DH matrices for a SCARA RRP robot, a validated MATLAB kinematics function and a live teaching-mode GUI.",
    lede: "Industrial Robotics coursework: a full kinematic analysis of a 3-DOF SCARA robot, plus a strategic essay on autonomous servicing robots in the UK space sector.",
    tags: ["MATLAB", "Robotics Toolbox", "DH parameters", "Kinematics"],
    github: "https://github.com/KeneOkwoli/SCARA-Forward-Kinematics",
    video: { id: "SV4mDW4J6j0" },
    cover: "images/scara-kinematics/cover.png",
    gallery: [
      { src: "images/scara-kinematics/01.png", cap: "Teaching-mode GUI" },
      { src: "images/scara-kinematics/02.png", cap: "DH frame assignment" }
    ],
    facts: {
      Software: "MATLAB, Peter Corke's Robotics Toolbox (RTB 10.4)",
      Hardware: "SCARA RRP, 3 DOF (simulated)",
      Skills: "DH derivation, homogeneous transforms, MATLAB GUI development, technical writing"
    },
    sections: [
      { h: "Process", ul: [
        "<b>DH derivation:</b> assigned frames using the standard convention and derived T1, T2, T3 and the full transform analytically.",
        "<b>Forward kinematics:</b> <code>scara_fkine(theta1, theta2, d5)</code> built with <code>Link()</code> and <code>SerialLink()</code>, with input validation on the prismatic joint (0 to 0.2 m).",
        "<b>Teaching mode:</b> a GUI with three sliders, PostSet listeners for live re-plotting, a live x, y, z readout and a DH reference panel.",
        "<b>Essay:</b> analysed in-space servicing and debris removal in the UK, covering signal latency, the £105 million ISAM investment, the Space Industry Act 2018 and dual-use concerns."
      ]},
      { h: "Key learnings", ul: [
        "Errors in alpha or d propagate silently through the matrix chain.",
        "RTB 10.4 SE3 objects need <code>double()</code> before element indexing.",
        "PostSet listeners give responsive GUI updates without polling loops."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "pendulum-system-id",
    title: "Damped Pendulum System Identification",
    subtitle: "Vibration Analysis in MATLAB",
    category: "University",
    short: "Extracted damping ratio, natural frequency and pendulum length from real acceleration data using logarithmic decrement.",
    lede: "System identification of a damped pendulum from recorded acceleration data, producing a fully automated MATLAB analysis workflow.",
    tags: ["MATLAB", "Signal processing", "System ID"],
    github: "https://github.com/KeneOkwoli/Damped-Pendulum-Analysis",
    cover: "images/pendulum-system-id/cover.png",
    gallery: [
      { src: "images/pendulum-system-id/01.png", cap: "Final annotated figure with computed parameters" }
    ],
    facts: {
      Software: "MATLAB",
      Skills: "Peak detection, logarithmic decrement, vibration theory, data interpretation"
    },
    sections: [
      { h: "Process", ul: [
        "Imported and plotted about 25 s of acceleration data showing a decaying oscillation of roughly ±4 m/s².",
        "Used <code>findpeaks</code> to extract consecutive peaks and overlaid them for visual confirmation.",
        "Calculated logarithmic decrement, damping ratio and natural frequency, then estimated pendulum length.",
        "Combined everything into one script that outputs an annotated figure with a parameter summary."
      ]},
      { h: "Key learnings", ul: [
        "Small errors in peak selection significantly affect damping estimates.",
        "Physical sanity checks, such as expected pendulum length, are essential for validating results."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "connect-four-ai",
    title: "Connect Four AI Agent",
    subtitle: "Minimax with Alpha-Beta Pruning",
    category: "University",
    short: "An interactive Pygame Connect Four with a Minimax opponent, alpha-beta pruning and adjustable difficulty.",
    lede: "A competitive Connect Four opponent that searches future board states, balancing attack and defence through a custom heuristic.",
    tags: ["Python", "Pygame", "Minimax", "AI"],
    github: "https://github.com/KeneOkwoli/Artificial-Intelligence-Principles",
    cover: "images/connect-four-ai/cover.png",
    gallery: [
      { src: "images/connect-four-ai/01.png", cap: "Difficulty selection" },
      { src: "images/connect-four-ai/02.png", cap: "Gameplay" }
    ],
    facts: {
      Software: "Python, Pygame, NumPy",
      Skills: "Adversarial search, game-tree pruning, heuristic design, event-driven UI"
    },
    sections: [
      { h: "Process", ul: [
        "<b>Board:</b> a 6 x 7 NumPy array with move validation and win checking in all directions.",
        "<b>UI:</b> Pygame board with the token following the mouse and an Easy/Hard difficulty screen.",
        "<b>AI:</b> recursive Minimax with alpha-beta pruning; search depth sets the difficulty.",
        "<b>Heuristic:</b> rewards central control and open two- and three-in-a-rows, and heavily penalises letting the opponent set up threes."
      ]},
      { h: "Key learnings", ul: [
        "Heuristics define the agent's personality as much as search depth.",
        "Balancing depth against response time is crucial for real-time play."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "storm-cartographer",
    title: "Storm Cartographer",
    subtitle: "Variable-Altitude Buoyancy Drone Concept",
    category: "University",
    short: "A conceptual autonomous explorer for Jupiter's Great Red Spot, using buoyancy instead of propulsion for altitude control.",
    lede: "A systems-level concept for long-duration atmospheric science on Jupiter, presented as an A1 research poster for the Mobile Robots and Drones module.",
    tags: ["Systems design", "Autonomy", "Fusion 360", "Research poster"],
    github: "https://github.com/KeneOkwoli/MobileRobots-StormCartographer-",
    video: { id: "mjo2obXeeDI" },
    cover: "images/storm-cartographer/cover.png",
    gallery: [
      { src: "images/storm-cartographer/01.png", cap: "A1 research poster" },
      { src: "images/storm-cartographer/02.png", cap: "3D navigation concept" }
    ],
    facts: {
      Software: "Fusion 360, Adobe Illustrator / Canva",
      Skills: "Systems design, autonomy architecture, fault tolerance, scientific communication"
    },
    sections: [
      { h: "Process", ul: [
        "<b>Concept:</b> identified buoyancy-driven altitude control as more energy-efficient than propellers for long-endurance flight in Jupiter's layered atmosphere.",
        "<b>VAB mechanism:</b> adjusts internal gas volume or ballast to reach neutral buoyancy at target altitudes, riding wind currents horizontally.",
        "<b>Autonomy:</b> a sensor-driven stack that detects atmospheric layer transitions, avoids hazardous pressure gradients and executes planned science passes.",
        "<b>Fault tolerance:</b> redundant subsystems and a safe-mode protocol for sensor failures and communication dropouts."
      ]},
      { h: "Key learnings", ul: [
        "Redundancy is far more effective designed in from the start than retrofitted.",
        "Communication delays of tens of minutes force fully independent decision-making."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "voice-controlled-car",
    title: "Voice Controlled Car",
    subtitle: "Speech-Driven Vehicle",
    category: "Personal",
    short: "An Arduino Nano car driven by trained voice commands, later extended for the Visual and Spoken Interfaces module.",
    lede: "A small vehicle controlled entirely by spoken commands such as forward, left, right and stop.",
    tags: ["Arduino", "Voice recognition", "Servos", "HMI"],
    github: "https://github.com/KeneOkwoli/Visual-and-Spoken-Interfaces",
    video: { id: "mDlRB4VgWxE", start: 242 },
    cover: "images/voice-controlled-car/cover.jpg",
    gallery: [
      { src: "images/voice-controlled-car/01.jpg", cap: "The car" }
    ],
    facts: {
      Hardware: "Arduino Nano, DFRobot Voice Recognition Module v3, 2x continuous-rotation servos, chassis, battery pack",
      Software: "Arduino IDE",
      Skills: "Servo control, I2C, embedded programming, voice-input debugging"
    },
    sections: [
      { h: "Process", ul: [
        "<b>Voice module:</b> connected over I2C, trained with multiple samples per command and mapped the resulting command IDs to movement logic.",
        "<b>Drive:</b> two continuous-rotation servos mapped to forward, reverse and pivoting behaviour, with stop at the 90 degree neutral pulse.",
        "<b>Command logic:</b> each recognised command triggers the matching servo action in real time."
      ]},
      { h: "Key learnings", ul: [
        "Continuous-rotation servos simplify drive but need careful neutral calibration.",
        "Recognition reliability improves significantly with consistent training samples."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "lcd-message-box",
    title: "LCD Message Box",
    subtitle: "Animated Affirmation Display",
    category: "Personal",
    short: "A Raspberry Pi Pico device with scrolling LCD messages, matrix-scanned buttons and servo choreography.",
    lede: "An interactive gift that shows encouraging messages with animated scrolling synchronised to servo movement.",
    tags: ["Raspberry Pi Pico", "MicroPython", "I2C LCD", "Servo"],
    github: "https://github.com/KeneOkwoli/MessageBox",
    cover: "images/lcd-message-box/cover.jpg",
    gallery: [
      { src: "images/lcd-message-box/01.jpg", cap: "Finished message box" },
      { src: "images/lcd-message-box/02.jpg", cap: "Internal wiring" },
      { src: "images/lcd-message-box/03.jpg", cap: "Message display" }
    ],
    facts: {
      Hardware: "Raspberry Pi Pico, LCD1602 with PCF8574 backpack, servo, 3-button matrix",
      Software: "MicroPython",
      Skills: "I2C, PWM, matrix scanning, animation timing, state management"
    },
    sections: [
      { h: "Process", ul: [
        "<b>Display driver:</b> PCF8574-based LCD1602 driver in 4-bit mode, with word-aware pagination across two 16-character lines.",
        "<b>Animation:</b> three scrolling modes (next, previous, random) synchronised with servo movement across 33 animation frames.",
        "<b>Buttons:</b> matrix scanning on three GPIOs with debouncing and release detection.",
        "<b>Debugging:</b> I2C bus scanning confirmed the LCD address (0x27) and revealed that GPIO 18/19 needed I2C(1), not I2C(0)."
      ]},
      { h: "Key learnings", ul: [
        "Animation timing is what makes a device feel polished rather than mechanical.",
        "I2C bus scanning is the first step when a device does not respond."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "rotating-picture-frame",
    title: "Rotating Picture Frame",
    subtitle: "Motorised Photo Display",
    category: "Personal",
    short: "An Arduino Nano and L298N driven frame that rotates photos at timed intervals with all electronics hidden.",
    lede: "A motorised picture frame with a custom 3D-printed enclosure, built as a gift.",
    tags: ["Arduino", "H-bridge", "PWM", "3D printing"],
    github: "https://github.com/KeneOkwoli/Rotating-Picture-Frame",
    cover: "images/rotating-picture-frame/cover.jpg",
    gallery: [
      { src: "images/rotating-picture-frame/01.jpg", cap: "Finished frame" },
      { src: "images/rotating-picture-frame/02.jpg", cap: "Internal mechanism" },
      { src: "images/rotating-picture-frame/03.png", cap: "CAD model" },
      { src: "images/rotating-picture-frame/04.png", cap: "Wiring" }
    ],
    facts: {
      Hardware: "Arduino Nano, L298N H-bridge, DC motors, PLA frame",
      Software: "Arduino IDE",
      Skills: "Motor control, PWM, CAD, mechanical assembly, wiring management"
    },
    sections: [
      { h: "Process", ul: [
        "<b>Mechanical:</b> printed enclosure with the motor mount aligned precisely to the shaft to prevent wobble and binding.",
        "<b>Motor control:</b> L298N at fixed PWM, with delays and power calibrated for consistent rotation.",
        "<b>Testing:</b> iterated speed, timing and clearances to reduce friction over repeated cycles."
      ]},
      { h: "Key learnings", ul: [
        "Motor-driven mechanisms need precise alignment to avoid stalling.",
        "Internal layout and wire routing affect long-term reliability."
      ]}
    ]
  },

  /* ---------------------------------------------------------- */
  {
    slug: "light-fixture-mount",
    title: "Outdoor Light Fixture Mount",
    subtitle: "Failure Analysis and Redesign",
    category: "Household Repair",
    short: "Reverse-engineered a snapped plastic mount and redesigned it in Fusion 360 with a fillet at the failure point.",
    lede: "Rather than copying the broken original, I redesigned it to remove the weakness that caused it to fail.",
    tags: ["Fusion 360", "Reverse engineering", "Failure analysis", "PLA"],
    github: "",
    cover: "images/light-fixture-mount/cover.jpg",
    gallery: [
      { src: "images/light-fixture-mount/01.jpg", cap: "The failed original" },
      { src: "images/light-fixture-mount/02.png", cap: "Fusion 360 redesign" },
      { src: "images/light-fixture-mount/03.jpg", cap: "Printed replacement fitted" }
    ],
    facts: {
      Software: "Fusion 360",
      Hardware: "FDM printing (PLA)",
      Skills: "Reverse engineering, measurement, CAD, failure analysis, design for strength"
    },
    sections: [
      { h: "Process", ul: [
        "<b>Measurement:</b> measured the original part, including the slotted mounting holes and the spoked boss that locates the fitting.",
        "<b>Failure analysis:</b> the original snapped at the sharp joint between the upright and the base plate.",
        "<b>Redesign:</b> kept the original mounting interface and added a fillet at that joint to spread stress.",
        "<b>Manufacture:</b> printed in PLA and fitted to the existing fixture without modification."
      ]},
      { h: "Key learnings", ul: [
        "The fracture location is the starting point for the redesign.",
        "Fillets at internal corners reduce stress concentration.",
        "For outdoor parts, PETG or ASA would outlast PLA."
      ]}
    ]
  }
];
