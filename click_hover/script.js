

let isPink = false;

function changeStyle() {
    if (!isPink) {
        // switch to pink style
        document.body.style.backgroundColor = "pink";
        document.body.style.color = "hotpink";
        document.body.style.fontFamily = "franklin gothic medium";
    } else {
        // switch back to original style
        document.body.style.backgroundColor = "#f0f0f0"; // matches your CSS
        document.body.style.color = "black";
        document.body.style.fontFamily = "Helvetica, sans-serif";
    }

    isPink = !isPink;
}

let isBlue = false;

function changeStyle2() {
    if (isBlue) {

        document.body.style.backgroundColor = "lightblue";
        document.body.style.color = "blue";
        document.body.style.fontFamily = "'Lucida Console', monospace";
    } else {
        document.body.style.backgroundColor = "#f0f0f0"; // matches your CSS
        document.body.style.color = "black";
        document.body.style.fontFamily = "Helvetica, sans-serif";
    }

    isBlue = !isBlue;
}

function startFloatAnimation(el) {
    // Prevent stacking multiple animations if you hover repeatedly
    if (el._floatAnim) return;

    el._floatAnim = el.animate(
        [
            { transform: "translateY(0px)" },
            { transform: "translateY(-12px)" }
        ],
        {
            duration: 700,
            iterations: Infinity,
            direction: "alternate",
            easing: "ease-in-out"
        }
    );
}

function stopFloatAnimation(el) {
    if (!el._floatAnim) return;
    el._floatAnim.cancel();
    el._floatAnim = null;
    el.style.transform = "translateY(0px)";
}

document.addEventListener("DOMContentLoaded", () => {
    // Page 2 button uses class="buddies"
    const floatButtons = document.querySelectorAll(".buddies");
    floatButtons.forEach((btn) => {
        btn.addEventListener("mouseenter", () => startFloatAnimation(btn));
        btn.addEventListener("mouseleave", () => stopFloatAnimation(btn));
    });
});