/* =========================================
   RBC CM Hero, Approach, and Themes
   Mobile-first with organized, alphabetized rules
   ========================================= */

/* ------------------------------------------------------------------
   Hero Section
   ------------------------------------------------------------------ */
.rbccm-hero {
  background: url("/assets/rbccm/images/imagine-images/imagine-2025-hero.jpg") right center no-repeat;
  background-size: cover;
  color: #FFFDFD;
  flex-shrink: 0;
  margin: 92px -15px 0 -15px;
  overflow: hidden;
  padding: 55px 31px;
  position: relative;
}

.rbccm-hero::before {
  background: linear-gradient(90deg, #002144 36.54%, rgba(0, 33, 68, 0) 100%);
  content: "";
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 0;
}

.rbccm-hero__container {
  margin: 0 auto;
  max-width: 1140px;
  position: relative;
  width: 100%;
  z-index: 1;
}

.rbccm-hero__intro {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 539px;
}

.rbccm-hero__logo {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  height: 94px;
  justify-content: center;
  margin: 0 0 10px 0;
  width: 145px;
}

.rbccm-hero__logo-image {
  height: auto;
  object-fit: contain;
  width: 100%;
}

.rbccm-hero__title {
  align-self: stretch;
  color: #FFFDFD;
  font-family: "RBCDisplay", Georgia, Times, serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
  padding: 0;
}

.rbccm-hero__desc {
  align-self: stretch;
  color: #FFFDFD;
  font-family: "RBCDisplay", Georgia, Times, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin: 0;
  max-width: 539px; /* rounded */
  padding: 0;
  width: 100%;
}

.rbccm-hero__btn {
  align-items: center;
  background: #0051A5;
  border: 1px solid #FFF; /* rounded */
  color: #FFF !important;
  display: flex;
  font-family: Roboto, system-ui;
  font-size: 13px; /* rounded */
  font-style: normal;
  font-weight: 600;
  justify-content: center;
  line-height: normal;
  padding: 12px 30px;
  text-align: center;
  text-decoration: none !important;
}

/* Hero with background video */
.rbccm-hero--video {
  position: relative;
  overflow: hidden;
  min-height: 675px; /* keep hero tall even when viewport narrows */
}

.rbccm-hero__video-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  overflow: hidden;
  z-index: 0;
}

.rbccm-hero__video-teaser {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* make sure hero content sits above the video */
.rbccm-hero__container {
  position: relative;
  z-index: 1;
}

/* ------------------------------------------------------------------
   Approach Section
   ------------------------------------------------------------------ */
.rbccm-approach {
  background-color: #002144;
  color: #FFFDFD;
}

.rbccm-approach__container {
  margin: 0 auto;
  max-width: 1140px;
}

.rbccm-approach__content {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px 16px;
}

.rbccm-approach__video {
  width: 100%;
  min-height: 193px;
}

.rbccm-approach__details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rbccm-approach__subtitle {
  color: #FFC72C;
  font-family: "RBCDisplay", Georgia, Times, serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  margin: 0;
}

.rbccm-approach__desc {
  color: #FFF;
  font-family: "RBCDisplay", Georgia, Times, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  margin: 0;
}

/* ------------------------------------------------------------------
   Themes Section - Mobile First (Accordion)
   ------------------------------------------------------------------ */
.rbccm-themes {
  background-color: #002144;
  color: #FFFDFD;
  padding: 0;
}

.rbccm-themes__container {
  margin: 0 auto;
  max-width: 1140px;
}

.rbccm-themes__heading {
  color: #FFFDFD;
  font-family: "RBCDisplay", Georgia, Times, serif;
  font-size: 24px;
  font-weight: 500;
  margin: 0 !important;
  padding: 35px 16px;
}

/* Tab list for all viewports */
.rbccm-themes__tablist {
  border-top: 1px solid #FFFDFD;
  display: flex;
  flex-direction: column;
}

/* Individual tab button */
.rbccm-themes__tab {
  background: transparent;
  border: none;
  border-bottom: 1px solid #FFFDFD;
  color: #FFFDFD;
  cursor: pointer;
  font-family: "RBC Display", Roboto, system-ui;
  font-size: 16px;
  font-weight: 400;
  padding: 18px 48px 18px 40px;
  position: relative;
  text-align: left;
  width: 100%;
}

/* Chevron for mobile */
.rbccm-themes__chevron {
  height: 25px;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  transition: transform 0.3s ease;
  width: 24px;
}

/* Active tab on mobile */
.rbccm-themes__tab.is-active {
  font-weight: 700;
}

.rbccm-themes__tab.is-active .rbccm-themes__chevron {
  transform: translateY(-50%) rotate(0deg);
}

/* Individual panel */
.rbccm-themes__panel {
  display: none;
  opacity: 0;
  padding: 24px 16px;
  transition: opacity 0.2s ease;
}

/* Show panel after active tab on mobile */
.rbccm-themes__tab.is-active + .rbccm-themes__panel {
  border-bottom: 1px solid white;
  display: block;
  opacity: 1;
}

.rbccm-theme__title {
  color: #FFFDFD;
  font-family: "RBCDisplay", Georgia, Times, serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 16px 0;
}

.rbccm-theme__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rbccm-theme__image {
  border-radius: 20px;
  height: auto;
  margin: 15px 0;
  width: 100%;
}

.rbccm-theme__text p {
  font-family: "Roboto Light", "Roboto", Arial, Verdana, sans-serif;
}

.rbccm-theme__text p,
.rbccm-themes__panel p {
  color: #FFFDFD;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 12px 0;
}

.rbccm-themes__panel p {
  font-family: "RBCDisplay", Georgia, Times, serif;
}

.rbccm-theme__text p:last-child {
  margin-bottom: 0;
}

/* ------------------------------------------------------------------
   Testimonials Carousel Section
   ------------------------------------------------------------------ */
.rbccm-testimonials {
  background-color: #001934;
  margin: 0;
  overflow: hidden;
  padding: 60px 16px 0 16px;
  position: relative;
}

.rbccm-testimonials::after {
  background: url('/assets/rbccm/images/imagine-images/large-gradient.png') no-repeat 45% 161px;
  background-size: cover;
  bottom: 0;
  content: "";
  left: 0;
  opacity: 0.15;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
}

.rbccm-testimonials > * {
  position: relative;
  z-index: 1;
}

.rbccm-testimonials__container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 1170px;
  position: relative;
}

.rbccm-testimonials__slider {
  margin: 0;
  padding: 0;
}

.rbccm-testimonials__slide {
  outline: none;
}

.rbccm-testimonials__content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.rbccm-testimonials__text-block {
  flex: 1;
}

.rbccm-testimonials__quote {
  color: #FFF;
  font-family: "RBC Display";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  margin: 0 0 20px 0;
  position: relative;
  max-width: none;
  padding: 0;
  border-left: 0;
}

.rbccm-testimonials__quote::before {
  content: """;
  font-size: 60px;
  left: -20px;
  line-height: 1;
  opacity: 0.3;
  position: absolute;
  top: -20px;
}

.rbccm-testimonials__author {
  color: #FFC72C;
  display: block;
  font-family: "RBCDisplay", Georgia, Times, serif;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  margin: 0 0 5px 0;
}

.rbccm-testimonials__role {
  color: #FFFDFD;
  display: block;
  font-family: "RBCDisplay", Georgia, Times, serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.4;
  font-style: normal;
}

.rbccm-testimonials__image-slide {
  align-items: flex-end;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  width: 100%;
}

.rbccm-testimonials__image-slide img {
  border-radius: 0;
  height: auto;
  margin: 0 auto;
  max-width: 292px;
  width: 100%;
}

.rbccm-testimonials__slider-text {
  margin: 0 !important;
}

/* Controls container */
.rbccm-testimonials__controls {
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 24px;
  justify-content: space-between;
  margin: 0 auto 20px auto;
  max-width: 343px;
  position: relative;
  width: 100%;
}

/* Arrows wrapper */
.rbccm-testimonials__arrows {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

/* Dots wrapper */
.rbccm-testimonials__dots,
.rbccm-testimonials__dots .slick-dots {
  align-items: center;
  display: flex !important;
  gap: 16px;
  justify-content: space-between;
}

.rbccm-testimonials__dots .slick-dots {
  bottom: initial;
  left: calc(50% - 95.5px);
  width: 191px;
}

.rbccm-testimonials__dots .slick-dots li {
  height: 11px;
  margin: 0;
  padding: 0;
  width: 11px;
}

/* Arrow buttons */
.custom-slick-prev,
.custom-slick-next {
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  height: 21px;
  justify-content: center;
  padding: 0;
  width: 24px;
}

/* Arrow colors */
.custom-slick-prev svg path {
  stroke: #979797;
}

.custom-slick-next svg path {
  stroke: #ffffff;
}

/* Dot styling */
.rbccm-testimonials__dots button {
  background: transparent !important;
  border: 1px solid white !important;
  border-radius: 50%;
  cursor: pointer;
  height: 11px !important;
  padding: 0;
  width: 11px !important;
}

.rbccm-testimonials__dots button:before {
  display: none;
}

.rbccm-testimonials__dots .slick-active button {
  background: white !important;
  border: 1px solid white !important;
}

/* Desktop arrows wrapper */
.rbccm-testimonials__arrows-desktop {
  align-items: center;
  display: none;
  flex-direction: row;
  height: 38px;
  justify-content: center;
  left: calc(50% - 550px);
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1100px;
  z-index: 3;
}

.rbccm-testimonials__arrows-desktop .custom-slick-prev,
.rbccm-testimonials__arrows-desktop .custom-slick-next {
  height: 38px;
  pointer-events: auto;
  position: absolute;
  transform: translateY(-50%);
  width: 19px;
}

.rbccm-testimonials__arrows-desktop .custom-slick-prev {
  left: -60px;
  top: 50%;
}

.rbccm-testimonials__arrows-desktop .custom-slick-next {
  right: -60px;
  top: 50%;
}

/* ------------------------------------------------------------------
   Desktop Media Queries (min-width: 992px)
   ------------------------------------------------------------------ */
@media (min-width: 992px) {
  /* Hero adjustments */
  .rbccm-hero {
    align-items: center;
    display: flex;
    min-height: 407px;
    padding: 92px 60px;
  }

  /* keep video hero tall on desktop too */
  .rbccm-hero--video {
    min-height: 675px;
  }

  .rbccm-hero__title {
    font-size: 40px;
    font-weight: 400;
    line-height: 59px; /* rounded */
  }

  .rbccm-hero__desc {
    font-size: 16px;
    font-weight: 300;
    line-height: 120%;
  }

  .rbccm-hero__logo {
    flex-shrink: 0;
    height: 143px;  /* rounded */
    width: 221px;   /* rounded */
  }

  .rbccm-hero__btn {
    font-size: 14px;            /* rounded */
    padding: 13px 33px;         /* rounded */
  }

  /* Approach adjustments */
  .rbccm-approach {
    padding: 34px 16px;
  }

  .rbccm-approach__content {
    align-items: center;
    flex-direction: row;
    gap: 76px;
    padding: 0;
  }

  .rbccm-approach__video {
    flex: 0 1 50%;
    max-width: 550px;
    min-height: 308px;
  }

  .rbccm-approach__details {
    flex: 1;
    gap: 24px;
  }

  .rbccm-approach__subtitle {
    font-size: 29px;
    max-width: calc(353 / 474 * 100%);
  }

  .rbccm-approach__desc {
    max-width: calc(433 / 474 * 100%);
  }

  /* Themes Section - Desktop Grid Layout */
  .rbccm-themes {
    padding: 65px 16px;
  }

  .rbccm-themes__heading {
    font-size: 29px;
    margin: 0 0 50px 0 !important;
    padding: 0;
  }

  /* Grid wrapper for tabs and panels */
  .rbccm-themes__wrapper {
    display: grid;
    gap: 0;
    grid-template-rows: auto auto;
  }

  /* Tab list becomes horizontal */
  .rbccm-themes__tablist {
    border-top: none;
    display: flex;
    flex-direction: row;
    grid-column: 1;
    grid-row: 1;
    justify-content: space-between;
    position: relative;
  }

  .rbccm-themes__tablist:after {
    background: white;
    bottom: 0;
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 0;
  }

  /* Tab buttons on desktop */
  .rbccm-themes__tab {
    border-bottom: 1px solid transparent;
    font-family: "RBCDisplay", Georgia, Times, serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    padding: 20px 0;
    text-align: center;
    transition: all 0.3s ease;
    width: auto;
    z-index: 1;
  }

  .rbccm-themes__tab:hover {
    border-bottom: 3px solid rgba(255, 199, 44, 0.5);
  }

  .rbccm-themes__tab.is-active {
    border-bottom: 3px solid #FFC736;
  }

  /* Hide chevrons on desktop */
  .rbccm-themes__chevron {
    display: none;
  }

  /* Panels container spans full width */
  .rbccm-themes__panels {
    grid-column: 1;
    grid-row: 2;
    padding-top: 60px;
  }

  /* Hide all panels by default on desktop */
  .rbccm-themes__panel {
    display: none;
    opacity: 0;
    padding: 0;
    transition: opacity 0.2s ease;
  }

  /* Show only active panel */
  .rbccm-themes__panel.is-active {
    display: block;
    opacity: 1;
  }

  /* Don't use adjacent selector on desktop */
  .rbccm-themes__tab.is-active + .rbccm-themes__panel {
    display: none;
    opacity: 0;
  }

  .rbccm-theme__title {
    font-size: 28px;
    margin-bottom: 10px;
  }

  .rbccm-theme__content {
    align-items: center;
    flex-direction: row;
    gap: 40px;
    justify-content: flex-start;
    margin-top: 45px;
  }

  .rbccm-theme__image {
    border-radius: 16px;
    flex: 0 0 45%;
    margin: 0;
    max-width: 500px;
  }

  .rbccm-theme__text {
    flex: 1;
  }

  .rbccm-theme__text p {
    font-family: "Roboto Light", "Roboto", Arial, Verdana, sans-serif;
  }

  .rbccm-theme__text p,
  .rbccm-themes__panel p {
    font-size: 16px;
    line-height: normal;
    margin-bottom: 15px;
  }

  /* Testimonials Desktop Styles */
  .rbccm-testimonials {
    padding: 0 16px;
  }

  .rbccm-testimonials::after {
    background: url('/assets/rbccm/images/imagine-images/large-gradient.png') no-repeat 467px -210px;
    background-size: 1239px 697px;
    left: calc(50% - 775px);
  }

  .rbccm-testimonials__container {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 60px;
    justify-content: space-between;
    min-height: 449px;
    padding: 40px 0 0 0;
  }

  .rbccm-testimonials__slider {
    padding: 0 80px;
  }

  .rbccm-testimonials__slider-text {
    flex: 0 0 100%;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 400px;
  }

  .rbccm-testimonials__slider-image {
    align-items: center;
    display: flex;
    flex: 0 0 100%;
    justify-content: flex-end;
    max-width: 411px;
  }

  .rbccm-testimonials__image-slide img {
    max-width: 411px;
  }

  .rbccm-testimonials__content {
    align-items: center;
    flex-direction: row;
    gap: 80px;
    padding: 0 40px;
  }

  .rbccm-testimonials__text-block {
    flex: 1;
    max-width: 600px;
  }

  .rbccm-testimonials__quote {
    font-size: 28px;
    line-height: 120%;
    margin: 0 0 15px 0;
  }

  .rbccm-testimonials__quote::before {
    font-size: 80px;
    left: -40px;
    top: -30px;
  }

  .rbccm-testimonials__author {
    font-size: 28px;
    line-height: 120%;
  }

  .rbccm-testimonials__role {
    font-size: 21px;
    line-height: 120%;
  }

  .rbccm-testimonials__image {
    flex-shrink: 0;
    margin: 0;
    max-width: 400px;
  }

  .rbccm-testimonials__image img {
    width: 400px;
  }

  /* Hide mobile arrows, show desktop arrows */
  .rbccm-testimonials__arrows {
    display: none;
  }

  .rbccm-testimonials__arrows-desktop {
    display: block;
  }

  /* Controls positioning */
  .rbccm-testimonials__controls {
    align-items: center;
    bottom: 20px;
    display: flex;
    gap: 20px;
    justify-content: center;
    left: calc(50% - 171.5px);
    position: absolute;
    width: 100%;
    z-index: 10;
  }

  .rbccm-testimonials__dots {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .rbccm-testimonials__dots button {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    height: 12px;
    width: 12px;
  }

  .rbccm-testimonials__dots .slick-active button {
    background: #FFF;
    border-color: #FFF;
  }
}

/* Additional grid-based testimonials layout */
@media (min-width: 992px) {
  .rbccm-testimonials__container {
    align-items: flex-end;
    display: flex;
    gap: 0 80px;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
  }

  #testimonialTextSlider {
    grid-column: 1;
    grid-row: 1;
  }

  .rbccm-testimonials__controls {
    grid-column: 1;
    grid-row: 2;
    justify-content: flex-start;
    margin-top: 24px;
  }

  #testimonialImageSlider {
    grid-column: 2;
    grid-row: 1 / span 2;
  }
}