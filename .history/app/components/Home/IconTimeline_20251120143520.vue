<script setup>
import { ref } from "vue";

// Timeline data
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

// Reactive state
const defaultText =
  "Hover over an icon to see the corresponding step description!";
const hoverText = ref(defaultText);
const activeId = ref(null);

// Event handlers
const handleMouseEnter = (item) => {
  hoverText.value = item.text;
  activeId.value = item.id;
};

const handleMouseLeaveContainer = () => {
  hoverText.value = defaultText;
  activeId.value = null;
};
</script>

<template>
  <div class="col-lg-6 mx-auto my-5">
    <div class="timeline-container" @mouseleave="handleMouseLeaveContainer">
      <!-- Header -->
      <div class="timeline-header">
        <h2>Project Development Journey</h2>
        <p>Follow our process from concept to completion</p>
      </div>

      <!-- Central display area -->
      <div class="timeline-text-display">
        <div class="display-content">
          <p class="display-text">{{ hoverText }}</p>
        </div>
      </div>

      <!-- Circular timeline -->
      <div class="timeline-ring"></div>
      <div class="timeline-line"></div>

      <!-- Timeline items -->
      <div
        v-for="(item, index) in timelineItems"
        :key="item.id"
        :class="[
          'timeline-circle',
          `circle-${index + 1}`,
          { 'is-active': activeId === item.id },
        ]"
        @mouseenter="handleMouseEnter(item)"
      >
        <div class="circle-inner">
          <Icon :name="item.icon" class="timeline-icon" />
        </div>
        <div class="step-label">Step {{ index + 1 }}</div>
      </div>

      <!-- Footer with progress indicator -->
      <div class="timeline-footer">
        <div class="progress-indicator">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{
                width: activeId
                  ? `${(activeId / timelineItems.length) * 100}%`
                  : '0%',
              }"
            ></div>
          </div>
          <span class="progress-text">
            {{
              activeId
                ? `Step ${activeId} of ${timelineItems.length}`
                : "Hover to see progress"
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";

// Color palette
$primary-color: #4361ee;
$secondary-color: #3a0ca3;
$accent-color: #f72585;
$success-color: #4cc9f0;
$warning-color: #fca311;
$light-color: #f8f9fa;
$dark-color: #212529;
$text-light: #6c757d;
$text-dark: #343a40;
$line-color: #e0e0e0;

// Dimensions
$circle-size: 70px;
$text-size: 180px;
$timeline-radius: 220px;
$container-size: ($timeline-radius * 2) + $circle-size;

.timeline-container {
  position: relative;
  width: $container-size;
  height: $container-size;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// Header styling
.timeline-header {
  text-align: center;
  margin-bottom: 30px;

  h2 {
    color: $secondary-color;
    font-weight: 700;
    font-size: 1.8rem;
    margin-bottom: 8px;
  }

  p {
    color: $text-light;
    font-size: 1rem;
  }
}

// Central display area
.timeline-text-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: $text-size;
  height: $text-size;
  border-radius: 50%;
  background: linear-gradient(135deg, $light-color 0%, #ffffff 100%);
  border: 4px solid $primary-color;
  box-shadow: 0 10px 30px rgba(67, 97, 238, 0.15),
    inset 0 2px 10px rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 3;
  transition: all 0.4s ease;

  &:hover {
    box-shadow: 0 15px 40px rgba(67, 97, 238, 0.25),
      inset 0 2px 10px rgba(255, 255, 255, 0.9);
    transform: translate(-50%, -50%) scale(1.02);
  }
}

.display-content {
  padding: 20px;

  .display-text {
    color: $text-dark;
    font-weight: 500;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
    transition: color 0.3s ease;
  }
}

// Timeline rings and lines
.timeline-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: $timeline-radius * 2;
  height: $timeline-radius * 2;
  border: 8px solid transparent;
  border-radius: 50%;
  background: linear-gradient($light-color, $light-color) padding-box,
    linear-gradient(135deg, $primary-color, $accent-color) border-box;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  z-index: 1;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ($timeline-radius * 2) - 20px;
  height: ($timeline-radius * 2) - 20px;
  border: 2px dashed rgba($primary-color, 0.3);
  border-radius: 50%;
  z-index: 1;
}

// Timeline circles
.timeline-circle {
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  transition: all 0.4s ease;

  .circle-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      $primary-color 0%,
      $secondary-color 100%
    );
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.6rem;
    box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
    transition: all 0.4s ease;
  }

  .step-label {
    position: absolute;
    bottom: -25px;
    font-size: 0.75rem;
    color: $text-light;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }

  // Hover and active states
  &:hover,
  &.is-active {
    .circle-inner {
      background: linear-gradient(
        135deg,
        $accent-color 0%,
        $warning-color 100%
      );
      transform: scale(1.15);
      box-shadow: 0 8px 25px rgba(247, 37, 133, 0.4);
    }

    .step-label {
      opacity: 1;
      transform: translateY(0);
      color: $accent-color;
    }
  }
}

// Positioning logic
$num-circles: 6;
$angle-increment: math.div(360deg, $num-circles);

@for $i from 1 through $num-circles {
  .circle-#{$i} {
    $angle: $angle-increment * ($i - 1);
    $x-offset: $timeline-radius * math.cos($angle);
    $y-offset: $timeline-radius * math.sin($angle);

    left: calc(50% + #{$x-offset} - (#{$circle-size} / 2));
    top: calc(50% + #{$y-offset} - (#{$circle-size} / 2));
  }
}

// Footer with progress indicator
.timeline-footer {
  margin-top: 40px;
  width: 100%;
  max-width: 400px;

  .progress-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;

    .progress-bar {
      width: 100%;
      height: 8px;
      background-color: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 10px;

      .progress-fill {
        height: 100%;
        background: linear-gradient(to right, $primary-color, $accent-color);
        border-radius: 4px;
        transition: width 0.5s ease;
      }
    }

    .progress-text {
      font-size: 0.85rem;
      color: $text-light;
      font-weight: 500;
    }
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  $circle-size-mobile: 60px;
  $text-size-mobile: 150px;
  $timeline-radius-mobile: 180px;
  $container-size-mobile: ($timeline-radius-mobile * 2) + $circle-size-mobile;

  .timeline-container {
    width: $container-size-mobile;
    height: $container-size-mobile;
  }

  .timeline-text-display {
    width: $text-size-mobile;
    height: $text-size-mobile;

    .display-text {
      font-size: 0.85rem;
    }
  }

  .timeline-ring {
    width: $timeline-radius-mobile * 2;
    height: $timeline-radius-mobile * 2;
  }

  .timeline-line {
    width: ($timeline-radius-mobile * 2) - 20px;
    height: ($timeline-radius-mobile * 2) - 20px;
  }

  .timeline-circle {
    width: $circle-size-mobile;
    height: $circle-size-mobile;

    .circle-inner {
      font-size: 1.4rem;
    }
  }

  @for $i from 1 through $num-circles {
    .circle-#{$i} {
      $angle: $angle-increment * ($i - 1);
      $x-offset: $timeline-radius-mobile * math.cos($angle);
      $y-offset: $timeline-radius-mobile * math.sin($angle);

      left: calc(50% + #{$x-offset} - (#{$circle-size-mobile} / 2));
      top: calc(50% + #{$y-offset} - (#{$circle-size-mobile} / 2));
    }
  }

  .timeline-header h2 {
    font-size: 1.5rem;
  }
}
</style>
