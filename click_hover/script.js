

let isPink = false;

function changeStyle() {
    if (!isPink) {
     
        document.body.style.backgroundColor = "pink";
        document.body.style.color = "hotpink";
        document.body.style.fontFamily = "franklin gothic medium";
    } else {

        document.body.style.backgroundColor = "#f0f0f0"; 
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
        document.body.style.backgroundColor = "#f0f0f0"; 
        document.body.style.color = "black";
        document.body.style.fontFamily = "Helvetica, sans-serif";
    }

    isBlue = !isBlue;
}

function startFloatAnimation(el) {
    if (el._floatAnim) return;

    el.classList.add("clouds-on");

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

    el.classList.remove("clouds-on");
}

$( function() {
    
    $(".buddies").on("mouseenter", function() {
        startFloatAnimation(this);
    });
    $(".buddies").on("mouseleave", function() {
        stopFloatAnimation(this);
    });

    var state = true;
    $( "#button" ).on( "click", function() {
      if ( state ) {
        $( "#effect" ).animate({
          backgroundColor: "#aa0000",
          color: "#fff",
          
        }, 1000 );
      } else {
        $( "#effect" ).animate({
          backgroundColor: "#fff",
          color: "#000",
          
        }, 1000 );
      }
      state = !state;
    });
  } );

  // Ripple click effect (Page 3 button has class="radiate")
  // Use delegated handler so it works even if script loads before the button exists.
  $(document).on('click', '.radiate', function(e) {
    const $btn = $(this);
    
    // Random ripple color each click
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const diameter = Math.max($btn.outerWidth(), $btn.outerHeight());
    const radius = diameter / 2;
  

    const $ripple = $('<span class="ripple"></span>');
  
    $ripple.css({
      width: `${diameter}px`,
      height: `${diameter}px`,
      left: `${e.pageX - $btn.offset().left - radius}px`,
      top: `${e.pageY - $btn.offset().top - radius}px`,
      background: `rgba(${r}, ${g}, ${b}, 0.35)`
    });
  

    $btn.find('.ripple').remove();
  

    $btn.append($ripple);
  });

// Page 4: make the divs jump up and down continuously (jQuery animation)
$(function () {
    const $divs = $('.yay > div');
    if (!$divs.length) return;

    const jumpPx = 60;
    const durationMs = 250;

    $divs.each(function (i) {
        const $d = $(this);

        // Prevent starting multiple infinite loops if script.js is re-run.
        if ($d.data('jumping')) return;
        $d.data('jumping', true);

        $d.css('top', '0px');

        const startDelay = i * 180;
        setTimeout(function loop() {
            $d.animate({ top: -jumpPx }, durationMs)
                .animate({ top: 0 }, durationMs, loop);
        }, startDelay);
    });
});

// Page 4: confetti burst on any click
$(function () {
    if (!$('.yay').length) return;

    // Attach once (avoid duplicates if script.js is reloaded)
    $(document).off('click.confetti').on('click.confetti', function (e) {
        const x = e.pageX;
        const y = e.pageY;
        burstConfetti(x, y);
    });
});

function burstConfetti(x, y) {
    const colors = [
        '#ff3b3b', '#ff9f1a', '#ffe66d', '#2dd4ff', '#34d399', '#a78bfa', '#60a5fa', '#f472b6'
    ];

    const count = 70;
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';

        const w = 4 + Math.random() * 7;   // 4-11px
        const h = 7 + Math.random() * 10;  // 7-17px

        piece.style.width = `${w}px`;
        piece.style.height = `${h}px`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = `${x}px`;
        piece.style.top = `${y}px`;

        // Scatter direction + distance
        const dx = (Math.random() - 0.5) * 260;     // left/right
        const dy = 120 + Math.random() * 320;      // down
        const rot = (Math.random() - 0.5) * 720;    // rotation
        const dur = 650 + Math.random() * 750;     // 0.65-1.4s

        piece.style.setProperty('--dx', `${dx}px`);
        piece.style.setProperty('--dy', `${dy}px`);
        piece.style.setProperty('--rot', `${rot}deg`);
        piece.style.animationDuration = `${dur}ms`;

        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), dur + 60);
    }
}
