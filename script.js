document.addEventListener("DOMContentLoaded", function(){

    const seal = document.getElementById("seal");
    const flap = document.getElementById("flap");
    const scene1 = document.getElementById("scene1");
    const scene2 = document.getElementById("scene2");
    const breakSound = document.getElementById("breakSound");
    const music = document.getElementById("music");
    const loveBtn = document.getElementById("loveBtn");
    const loveText = document.getElementById("loveText");
    const particlesContainer = document.getElementById("particles");
    const wifeImg = document.querySelector(".wife-img");

    // Аудиофайлы
    const mergeMusic = new Audio("audio/merge.mp3");
    const funnySound = new Audio("audio/funny.mp3");
    const funny2Sound = new Audio("audio/funny2.mp3"); // новый трек после funny

    let meImg = null;
    let particleInterval = null;

    // ===== Клик по печати =====
    seal.addEventListener("click", function(){
        breakSound.play().catch(()=>{});
        explodeSeal(seal);
        flap.style.transform = "rotateX(180deg)";
        setTimeout(()=>{
            scene1.classList.add("hidden");
            scene2.classList.remove("hidden");
        },1000);
    });

    function explodeSeal(element){
        const rect = element.getBoundingClientRect();
        const piecesCount = 35;

        for(let i=0;i<piecesCount;i++){
            let piece=document.createElement("div");
            piece.style.position="fixed";
            piece.style.width="12px";
            piece.style.height="12px";
            piece.style.background="radial-gradient(circle at 30% 30%,#ff6b8a,#8b0025)";
            piece.style.borderRadius="50%";
            piece.style.left=rect.left+rect.width/2+"px";
            piece.style.top=rect.top+rect.height/2+"px";
            piece.style.zIndex="999";
            piece.style.pointerEvents="none";
            document.body.appendChild(piece);

            let angle=Math.random()*2*Math.PI;
            let distance=200+Math.random()*150;
            let x=Math.cos(angle)*distance;
            let y=Math.sin(angle)*distance;

            setTimeout(()=>{
                piece.style.transition="1s";
                piece.style.transform=`translate(${x}px,${y}px) rotate(${Math.random()*720}deg)`;
                piece.style.opacity="0";
            },10);

            setTimeout(()=>piece.remove(),1000);
        }

        element.style.display="none";
    }

    // ===== Кнопка "Поздравить Катюшку" =====
    loveBtn.addEventListener("click", function(){
        music.play().catch(()=>{});
        loveText.classList.remove("hidden");
        launchMeImage();
        startParticles();
    });

    // ===== Вылет PNG =====
    function launchMeImage(){
        meImg = document.createElement("img");
        meImg.src = "images/me.png";
        meImg.style.position="fixed";
        meImg.style.width="100px";
        meImg.style.top = "50px";
        meImg.style.left = "100vw";
        meImg.style.zIndex = 999;
        meImg.style.transition = "8s ease-in-out";

        document.body.appendChild(meImg);

        setTimeout(()=>{
            meImg.style.left = "50%";
            meImg.style.top = "50%";
            meImg.style.transform = "translate(-50%, -50%) scaleX(1)";
        },50);

        setTimeout(()=>{
            meImg.style.transform = "translate(-50%, -50%) scaleX(-1)";
            showMergeButton();
        },8050);

        setTimeout(()=>{ if(meImg) meImg.remove(); },16100);
    }

    // ===== Кнопка "Объединить" =====
    function showMergeButton(){
        loveBtn.style.display = "none";

        const mergeBtn = document.createElement("button");
        mergeBtn.id = "mergeBtn";
        mergeBtn.className = "love-btn";
        mergeBtn.innerText = "Объединить";
        scene2.appendChild(mergeBtn);

        mergeBtn.addEventListener("click", function(){
            music.pause();
            if(meImg) meImg.remove();
            mergeMusic.play().catch(()=>{});

            wifeImg.style.transition = "1s";
            wifeImg.style.opacity = "0";
            setTimeout(()=>{
                wifeImg.src = "images/wife_together.png";
                wifeImg.style.opacity = "1";
            },200);

            loveText.innerHTML = 'С праздником, моя валентинка ❤️';

            mergeBtn.innerText = "НЕ НАЖИМАЙ";
            mergeBtn.removeEventListener("click", arguments.callee);

            mergeBtn.addEventListener("click", function(){
                // ===== Останавливаем все текущие звуки =====
                music.pause();
                mergeMusic.pause();
                breakSound.pause();
                funnySound.currentTime = 0;
                funny2Sound.currentTime = 0;

                funnySound.play().catch(()=>{});

                // После окончания funnySound запускаем funny2Sound
                funnySound.onended = function(){
                    funny2Sound.play().catch(()=>{});
                };

                if(particleInterval) clearInterval(particleInterval);

                loveText.innerHTML = "Я же говорил...";
                mergeBtn.style.display = "none";

                wifeImg.style.transition = "1s";
                wifeImg.style.opacity = "0";
                setTimeout(()=>{
                    wifeImg.src = "images/wife_funny.png";
                    wifeImg.style.opacity = "1";
                },200);
            });
        });
    }

    // ===== Частицы =====
    function startParticles(){
        particleInterval = setInterval(()=>{
            let particle = document.createElement("div");
            particle.className = "particle";
            const symbols=["❤","🌸","🌺","💖","✨","🌟"];
            particle.innerHTML = symbols[Math.floor(Math.random()*symbols.length)];
            particle.style.left = Math.random()*100 + "vw";
            particle.style.fontSize = (15+Math.random()*25) + "px";
            particle.style.animationDuration = (6+Math.random()*6)+"s";
            particlesContainer.appendChild(particle);
            setTimeout(()=>particle.remove(),12000);
        },300);
    }

});
