import React, { useState, useEffect } from 'react';
// Assuming 'Icon' component is imported or defined elsewhere,
// for a single-file React component, we'll use a simple placeholder or inline SVG for demonstration.
// Since the original was a Vue component using a library component named 'Icon',
// I will replace it with a simple <div> containing the icon name.
// NOTE: I am converting this to a React component as it is the closest standard for a modern single-file component approach.

// Placeholder for the Icon component used in the original Vue template
const Icon = ({ name, className }) => (
    <div className={className} style={{ fontSize: '1.75rem' }}>
        {/* Simple mapping for mdi icons used in the example */}
        {name.includes('lightbulb') && '💡'}
        {name.includes('tools') && '🛠️'}
        {name.includes('code-braces') && '💻'}
        {name.includes('bug') && '🔍'}
        {name.includes('rocket') && '🚀'}
        {name.includes('chart-line') && '📈'}
    </div>
);


const timelineItems = [
    {
        id: 1,
        icon: "mdi:lightbulb-on-outline",
        text: "💡 Idea Generation: Starting with a spark of creativity and a core concept.",
    },
    {
        id: 2,
        icon: "mdi:tools",
        text: "🛠️ Planning & Tools: Structuring the project and selecting the right tech stack.",
    },
    {
        id: 3,
        icon: "mdi:code-braces",
        text: "💻 Development Sprint: Coding the features and building the foundation.",
    },
    {
        id: 4,
        icon: "mdi:bug",
        text: "🔍 Testing & Quality: Thoroughly checking for bugs and ensuring reliability.",
    },
    {
        id: 5,
        icon: "mdi:rocket-launch-outline",
        text: "🚀 Final Launch: Deploying the application to the production environment.",
    },
    {
        id: 6,
        icon: "mdi:chart-line",
        text: "📈 Analysis & Growth: Monitoring performance and planning future updates.",
    },
];

const defaultText = "Hover over an icon to see the corresponding step description!";
const TRANSITION_DURATION = 200; // Time in milliseconds for the fade effect

const TimelineComponent = () => {
    const [hoverText, setHoverText] = useState(defaultText);
    const [activeId, setActiveId] = useState(null);
    const [isFading, setIsFading] = useState(false);

    const handleMouseEnter = (item) => {
        if (hoverText !== item.text) {
            setIsFading(true);
            setTimeout(() => {
                setHoverText(item.text);
                setActiveId(item.id);
                setIsFading(false);
            }, TRANSITION_DURATION);
        } else {
            setActiveId(item.id);
        }
    };

    const handleMouseLeaveContainer = () => {
        if (hoverText !== defaultText) {
            setIsFading(true);
            setTimeout(() => {
                setHoverText(defaultText);
                setActiveId(null);
                setIsFading(false);
            }, TRANSITION_DURATION);
        } else {
            setActiveId(null);
        }
    };

    return (
        <div className="mx-auto my-8 p-6 section-bg light-theme-context">
            <div 
                className="timeline-container" 
                onMouseLeave={handleMouseLeaveContainer}
                // Setting tabIndex allows the div to receive focus, useful for accessibility/keyboard users
                tabIndex="0" 
            >
                <div className="timeline-text-display">
                    <p className={`h5 text-center p-3 mb-0 text-white ${isFading ? 'is-fading' : ''}`}>
                        {hoverText}
                    </p>
                </div>

                <div className="timeline-line"></div>
                
                {/* --- NEW ATOMIC ORBITS STRUCTURE --- */}
                <div className="atom-orbits">
                    <div className="orbit-line orbit-1">
                        <div className="orbit-bullet"></div>
                    </div>
                    <div className="orbit-line orbit-2">
                        <div className="orbit-bullet"></div>
                    </div>
                </div>
                {/* --------------------------------- */}

                {timelineItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={`timeline-circle circle-${index + 1} ${activeId === item.id ? 'is-active' : ''}`}
                        onMouseEnter={() => handleMouseEnter(item)}
                    >
                        <Icon name={item.icon} className="timeline-icon" />
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- SCSS/CSS Styles ---
// Since this is a single-file component, we'll use inline style blocks for CSS.

const styles = `
    .mx-auto { margin-left: auto; margin-right: auto; }
    .my-8 { margin-top: 2rem; margin-bottom: 2rem; }
    .p-6 { padding: 1.5rem; }
    .section-bg { background-color: #f7f7f7; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); }
    .text-center { text-align: center; }
    .p-3 { padding: 0.75rem; }
    .mb-0 { margin-bottom: 0; }
    .h5 { font-size: 1.25rem; font-weight: 500; }
    .text-white { color: #ffffff; }

    /* SCSS Variables (Converted to raw CSS/Calc) */
    :root {
        --secondary-color: #f0f0f0;
        --accent-color: #000000;
        --line-color: #ababab;
        --light-bg-color: #ffffff;
        --text-color-dark: #343a40;
        --circle-size: 50px;
        --text-size: 180px;
        --timeline-radius: 200px;
        --container-size: calc(var(--timeline-radius) * 2 + var(--circle-size));
    }

    .timeline-container {
        position: relative;
        width: var(--container-size);
        height: var(--container-size);
        margin: 0 auto;
    }

    /* --- The Center Text Display Circle --- */
    .timeline-text-display {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: var(--text-size);
        height: var(--text-size);
        border-radius: 50%;
        background-color: var(--accent-color);
        border: 4px solid var(--accent-color);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        z-index: 3;
        transition: all 0.5s ease;
    }

    .timeline-text-display p {
        color: var(--light-bg-color);
        font-size: 1rem;
        transition: opacity 0.2s ease-in-out;
        opacity: 1;
    }

    .timeline-text-display .is-fading {
        opacity: 0;
    }

    /* --- The Main Circular Line (Decorative Ring) --- */
    .timeline-line {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(var(--timeline-radius) * 2);
        height: calc(var(--timeline-radius) * 2);
        border: 2px solid var(--line-color);
        border-radius: 50%;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
        z-index: 1;
    }

    /* --- The Icon Circles (Existing) --- */
    .timeline-circle {
        width: var(--circle-size);
        height: var(--circle-size);
        border-radius: 50%;
        background-color: var(--accent-color);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--light-bg-color);
        font-size: 1.75rem;
        cursor: pointer;
        position: absolute;
        z-index: 2;
        transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .timeline-circle:hover,
    .timeline-circle.is-active {
        background-color: var(--light-bg-color);
        transform: scale(1.05);
        border: 1px solid var(--accent-color);
        color: var(--accent-color);
    }

    /* --- Positioning Logic (Existing - Converted from SCSS loop) --- */
    /* This is manually calculated for 6 items for simplicity */
    .circle-1 { top: calc(50% - 25px); left: calc(50% + 200px - 25px); } /* 0 deg */
    .circle-2 { top: calc(50% + 173.2px - 25px); left: calc(50% + 100px - 25px); } /* 60 deg */
    .circle-3 { top: calc(50% + 173.2px - 25px); left: calc(50% - 100px - 25px); } /* 120 deg */
    .circle-4 { top: calc(50% - 25px); left: calc(50% - 200px - 25px); } /* 180 deg */
    .circle-5 { top: calc(50% - 173.2px - 25px); left: calc(50% - 100px - 25px); } /* 240 deg */
    .circle-6 { top: calc(50% - 173.2px - 25px); left: calc(50% + 100px - 25px); } /* 300 deg */

    /* --- NEW ATOMIC ORBIT STYLES (3D and Animation) --- */
    
    @keyframes atom-spin {
        from { transform: translate(-50%, -50%) rotateX(60deg) rotateY(0deg); }
        to { transform: translate(-50%, -50%) rotateX(60deg) rotateY(360deg); }
    }

    @keyframes bullet-orbit {
        from { transform: rotateZ(0deg); }
        to { transform: rotateZ(360deg); }
    }

    .atom-orbits {
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(var(--timeline-radius) * 2);
        height: calc(var(--timeline-radius) * 2);
        z-index: 0;
        
        /* 3D context and initial tilt */
        transform-style: preserve-3d;
        transform: translate(-50%, -50%) rotateX(60deg);

        /* Slow 3D rotation of the entire atom structure */
        animation: atom-spin 40s linear infinite; 
    }

    .orbit-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px dashed rgba(var(--accent-color), 0.2);
        
        /* Ensures the line rotates its bullet on the Z-axis */
        animation: bullet-orbit 8s linear infinite; 
    }

    .orbit-2 {
        /* Rotate the second orbit 90 degrees on the Z axis to intersect */
        transform: rotateZ(90deg);
        /* Make the second one spin slightly slower and in reverse */
        animation: bullet-orbit 12s linear infinite reverse;
    }

    .orbit-bullet {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--accent-color);
        position: absolute;
        top: 50%;
        left: 100%;
        
        /* Counter-rotate the bullet so it appears to stay upright as the line rotates */
        transform: translate(-50%, -50%);
        box-shadow: 0 0 5px rgba(var(--accent-color), 0.8);
    }
`;

// Inject the CSS styles into the document head
useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
        document.head.removeChild(styleSheet);
    };
}, []);

export default TimelineComponent;