
document.addEventListener("DOMContentLoaded", function () {
    const forgiveBtn = document.getElementById("forgiveBtn");
    const response = document.getElementById("response");
    const floatingHearts = document.getElementById("floatingHearts");
    const gif = document.querySelector(".sorry-gif");
    const music = document.getElementById("backgroundMusic");

    if (!forgiveBtn || !response || !floatingHearts || !gif) {
        console.error("A required HTML element is missing.");
        return;
    }

    // Replace this URL with another direct GIF URL if you prefer.
    const happyGifURL =
        "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif";

    const symbols = ["💙", "🩵", "🤍", "♡", "✨"];

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let celebrationStarted = false;

    function createHeart() {
        if (reducedMotion.matches) return;

        // Keep the page from filling up with too many hearts.
        if (floatingHearts.childElementCount >= 35) return;

        const heart = document.createElement("span");

        heart.className = "heart";
        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left = Math.random() * 95 + "%";
        heart.style.fontSize = (16 + Math.random() * 16) + "px";
        heart.style.setProperty(
            "--duration",
            (4 + Math.random() * 4) + "s"
        );

        floatingHearts.appendChild(heart);

        heart.addEventListener("animationend", function () {
            heart.remove();
        }, { once: true });
    }

    async function handleForgivenessClick() {
        if (celebrationStarted) return;

        celebrationStarted = true;

        // Update the apology response.
        response.textContent =
            "Tagna kopa pasayloon, lisud pod HAHAHAHAHA 🫂💙";

        forgiveBtn.textContent = "LabLab 🩵";
        forgiveBtn.disabled = true;

        // Replace the existing sad GIF in the SAME position.
        const previousGif = gif.src;

        gif.onerror = function () {
            console.error("The happy GIF could not load.");
            gif.onerror = null;

            // Restore the original GIF if the new one fails.
            gif.src = previousGif;
            gif.alt = "Cute cat saying sorry";
        };

        gif.alt = "Happy celebration";
        gif.src = happyGifURL;

        // Start the music after the user's click.
        if (music) {
            try {
                await music.play();
            } catch (error) {
                console.error("Music playback failed:", error);

                response.textContent =
                    "I have something to say to you 💙 Please press Play on the music player below. 🎵";
            }
        }

        // Release a burst of floating hearts.
        for (let i = 0; i < 18; i++) {
            createHeart();
        }

        // Continue the hearts gently after the click.
        if (!reducedMotion.matches) {
            const heartInterval = window.setInterval(createHeart, 700);

            // Stop generating hearts after 12 seconds.
            window.setTimeout(function () {
                window.clearInterval(heartInterval);
            }, 12000);
        }
    }

    forgiveBtn.addEventListener("click", handleForgivenessClick);
});
