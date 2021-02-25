$(document).ready(function () {
  let containerA = document.getElementById('circleA');
  let circleA = new ProgressBar.Circle(containerA, {
    color: '#63ee55',
    strokeWidth: 8,
    duration: 1400,
    from: { color: '#1a4385' },
    to: { color: '#63ee55' },
    step: function (state, circle) {

      circle.path.setAttribute('stroke', state.color);
      let value = Math.round(circle.value() * 1027);
      circle.setText(value);

    }
  });

  let containerB = document.getElementById('circleB');
  let circleB = new ProgressBar.Circle(containerB, {
    color: '#79ec6f',
    strokeWidth: 8,
    duration: 1600,
    from: { color: '#1a4385' },
    to: { color: '#95e98d' },
    step: function (state, circle) {

      circle.path.setAttribute('stroke', state.color);
      let value = Math.round(circle.value() * 1027);
      circle.setText(value);

    }
  });

  let containerC = document.getElementById('circleC');
  let circleC = new ProgressBar.Circle(containerC, {
    color: '#1ead11',
    strokeWidth: 8,
    duration: 2000,
    from: { color: '#1a4385' },
    to: { color: '#1ead11' },
    step: function (state, circle) {

      circle.path.setAttribute('stroke', state.color);
      let value = Math.round(circle.value() * 110);
      circle.setText(value);

    }
  });

  let containerD = document.getElementById('circleD');
  let circleD = new ProgressBar.Circle(containerD, {
    color: '#fff',
    strokeWidth: 8,
    duration: 2200,
    from: { color: '#1a4385' },
    to: { color: '#94cf8e' },
    step: function (state, circle) {

      circle.path.setAttribute('stroke', state.color);
      let value = Math.round(circle.value() * 5200);
      circle.setText(value);

    }
  });

  let dataAreaOffset = $('#data-area').offset();
  let stop = 0;

  $(window).scroll(function (e) {
    let scroll = $(window).scrollTop();
    if (scroll > (dataAreaOffset.top - 500) && stop == 0) {
      circleA.animate(1.0);
      circleB.animate(1.0);
      circleC.animate(1.0);
      circleD.animate(1.0);

      stop = 1;
    };
  });

  setTimeout(function () {
    $('#data-area').parallax({ imageSrc: 'images/parallax.jpg' });
  }, 250);

});