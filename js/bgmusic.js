/**
 * Background music player — floating button on all pages
 * Plays audio/bgmusic.mp3 across pages
 */
(function () {
  // Create floating music button
  var btn = document.createElement('button');
  btn.id = 'bg-music-btn';
  btn.innerHTML = '🎵';
  btn.title = 'Play Tum Hi Ho';
  btn.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;width:50px;height:50px;border-radius:50%;border:2px solid rgba(255,255,255,0.4);background:rgba(0,0,0,0.4);backdrop-filter:blur(10px);color:#fff;font-size:1.4rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(0,0,0,0.2);';

  // Pulse animation when not playing
  var pulseStyle = document.createElement('style');
  pulseStyle.textContent = '@keyframes musicPulse{0%,100%{box-shadow:0 4px 15px rgba(0,0,0,0.2)}50%{box-shadow:0 4px 25px rgba(255,107,157,0.5),0 0 15px rgba(196,77,255,0.3)}}#bg-music-btn.pulsing{animation:musicPulse 2s ease-in-out infinite}#bg-music-btn:hover{transform:scale(1.1)}';
  document.head.appendChild(pulseStyle);

  btn.classList.add('pulsing');
  document.body.appendChild(btn);

  // Create audio element
  var audio = document.createElement('audio');
  audio.id = 'bg-music-audio';
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0.4;

  var source = document.createElement('source');
  source.src = 'audio/bgmusic.mp3';
  source.type = 'audio/mpeg';
  audio.appendChild(source);

  var source2 = document.createElement('source');
  source2.src = 'audio/bgmusic.opus';
  source2.type = 'audio/ogg; codecs=opus';
  audio.appendChild(source2);

  document.body.appendChild(audio);

  var isPlaying = false;

  btn.addEventListener('click', function () {
    if (isPlaying) {
      audio.pause();
      btn.innerHTML = '🎵';
      btn.classList.add('pulsing');
      isPlaying = false;
    } else {
      audio.play().catch(function () {});
      btn.innerHTML = '🔊';
      btn.classList.remove('pulsing');
      isPlaying = true;
    }
  });

  audio.addEventListener('ended', function () {
    // Loop handles this, but just in case
    isPlaying = false;
    btn.innerHTML = '🎵';
    btn.classList.add('pulsing');
  });
})();
