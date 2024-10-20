     // Add a simple animation to show items one by one
     document.addEventListener('DOMContentLoaded', function() {
        const items = document.querySelectorAll('.learning-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });


            // Add a simple animation to show items one by one
            document.addEventListener('DOMContentLoaded', function() {
                const items = document.querySelectorAll('.item, .project-card');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            });

            
                  // Intersection Observer for animations
      const animateOnScroll = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
      });

      document.querySelectorAll(".animate-fadeInUp").forEach((item) => {
        item.classList.remove("animate-fadeInUp");
        observer.observe(item);
      });

      const canvas = document.getElementById("particle-canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particles = [];
      const numberOfParticles = 100;

      class Particle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = Math.random() * 5 + 1;
          this.speedX = Math.random() * 3 - 1.5;
          this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.size > 0.2) this.size -= 0.1;
        }

        draw() {
          ctx.fillStyle = "rgba(255, 255, 255, 1)";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      function init() {
        for (let i = 0; i < numberOfParticles; i++) {
          particles.push(
            new Particle(
              Math.random() * canvas.width,
              Math.random() * canvas.height
            )
          );
        }
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
          }
        }
        requestAnimationFrame(animate);
      }

      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });

      let mouse = {
        x: null,
        y: null,
      };

      window.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
        for (let i = 0; i < 5; i++) {
          particles.push(new Particle(mouse.x, mouse.y));
        }
      });

      init();
      animate();