(() => {
    // 자동호출 함수
    let yOffset = 0; // window.pageYOffset 대신 쓸 변수

    let prevScrollHeight = 0;
    // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 색션들의 스크롤 높이값의 합

    let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

    const sceneInfo = [
        {
            // index 0
            type: 'sticky',
            // 스크롤 높이
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            // 다른함수에서 높이 설정을 해줄거임
            // scren의 n배수로 설정할거임, 물론 여기서도 그렇게 세팅할 수 있지만,
            // 어차피 창 사이즈 변경에도 대응해야해서 따로 함수로 처리한다.
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values: {
                // messageA의 투명도, 배열로 시작값과 끝값을 줄거
                messageA_opacity: [0, 1]
            }
        },
        {
            // index 1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // index 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            // index 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        },
    ]; // scroll section

    function setLayout() {
        // 각 스크롤색션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageyOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = 1;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function playAnimation() {

    }

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            // id 갱신
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (yOffset < prevScrollHeight) {
            // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(maybe mobile)
            if (currentScene === 0) return;
            currentScene--;
            // id 갱신
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        function calcValues(values, currentYOffset) {
            let rv;

            return rv;
        }

        function playAnimation() {
            const objs = sceneInfo[currentScene].objs;
            const values = sceneInfo[currentScene].values;
            const currentYOffset = yOffset - prevScrollHeight;

            console.log(currentScene, currentYOffset);

            switch (currentScene) {
                case 0:
                    let messageA_opacity_0 = values.messageA_opacity[0];
                    let messageA_opacity_1 = values.messageA_opacity[1];
                    console.log(calcValues(values.messageA_opacity, currentYOffset));
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
            }
        }
    }

    // window size의 변화에 따라 높이도 달라진다.
    window.addEventListener('resize', setLayout);

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    // window.addEventListener('DdEventListener', setLayout);
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
    // 각 씬의 스크롤 섹션 엘리먼트의 높이 설정
    setLayout();
})();