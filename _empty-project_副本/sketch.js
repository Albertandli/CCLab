< !DOCTYPE html >
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>带我走</title>
          <style>
        /* 基础样式 */
            * {
              margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
            transition: all 0.5s ease;
        }

            body {
              background: linear-gradient(135deg, #ffecd2, #fcb69f);
            color: #5d4037;
            line-height: 1.6;
            overflow-x: hidden;
            min-height: 100vh;
        }

            /* 温馨部分 */
            .sunny-section {
              padding: 80px 20px;
            max-width: 800px;
            margin: 0 auto;
        }

            .sunny-section.hidden {
              display: none;
        }

            .memory-card {
              background: rgba(255, 255, 255, 0.85);
            border-radius: 20px;
            padding: 30px;
            margin: 60px 0;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

            .memory-img {
              width: 100%;
            border-radius: 15px;
            margin: 20px 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

            /* 小人样式 */
            .peek-container {
              position: fixed;
            width: 60px;
            height: 60px;
            z-index: 100;
            transition: all 0.1s ease;
        }

            .peek-head {
              width: 100%;
            height: 100%;
            background: #333;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }

            .peek-eyes {
              position: absolute;
            top: 20px;
            width: 100%;
            display: flex;
            justify-content: space-around;
        }

            .eye {
              width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
        }

            /* 阴暗部分 */
            .dark-section {
              background: #111;
            color: #e0e0e0;
            padding: 80px 20px;
            min-height: 100vh;
            display: none;
        }

            .dark-section.visible {
              display: block;
        }

            .dark-memory {
              background: rgba(30, 30, 30, 0.7);
            border-radius: 10px;
            padding: 30px;
            margin: 80px 0;
            border-left: 4px solid #f44336;
        }

            .dark-img {
              width: 100%;
            border-radius: 8px;
            margin: 20px 0;
            filter: grayscale(100%) contrast(130%);
        }

            /* 对话框样式 */
            .dialog-container {
              position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.5s;
        }

            .dialog-container.visible {
              opacity: 1;
            pointer-events: all;
        }

            .dialog-box {
              background: #fff;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
            transform: scale(0.8);
            animation: dialogAppear 0.5s forwards;
        }

            .character-in-dialog {
              width: 100px;
            height: 100px;
            background: #333;
            border-radius: 50%;
            margin: -70px auto 20px;
            position: relative;
        }

            .dialog-message {
              margin: 20px 0;
            font-size: 1.2rem;
            color: #333;
        }

            .dialog-options {
              display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 30px;
        }

            .dialog-btn {
              padding: 12px 24px;
            border: none;
            border-radius: 50px;
            background: #ff9800;
            color: white;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s;
        }

            .dialog-btn:hover {
              transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

            /* 文字效果 */
            .normal-text {
              font - size: 1.2rem;
            margin: 15px 0;
            line-height: 1.8;
        }

            .distorted-text {
              color: #f44336;
            text-shadow: 0 0 5px rgba(244, 67, 54, 0.5);
            animation: glitch 1s infinite;
        }

            .dragging-text {
              color: #f44336;
            text-shadow:
            2px 2px 0 #ff9800,
            4px 4px 0 #e91e63,
            6px 6px 0 #9c27b0;
            filter: blur(0.5px);
        }

            /* 崩溃效果 */
            .break-effect {
              position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(244, 67, 54, 0.9);
            z-index: 500;
            display: none;
            pointer-events: none;
        }

            .break-effect.visible {
              display: block;
            animation: breakAnimation 2s forwards;
        }

            /* 动画 */
            @keyframes glitch {
              0 % { transform: translateX(0); }
            20% {transform: translateX(-3px); }
            40% {transform: translateX(3px); }
            60% {transform: translateX(-3px); }
            80% {transform: translateX(3px); }
            100% {transform: translateX(0); }
        }

            @keyframes breakAnimation {
              0 % { opacity: 0; }
            30% {opacity: 1; transform: scale(1); }
            70% {opacity: 1; transform: scale(1.1) rotate(2deg); }
            100% {opacity: 0; transform: scale(1.2) rotate(5deg); }
        }

            @keyframes dialogAppear {
              to {transform: scale(1); }
        }

            @keyframes float {
              0 % { transform: translateY(0px); }
            50% {transform: translateY(-10px); }
            100% {transform: translateY(0px); }
        }

            /* 响应式设计 */
            @media (max-width: 768px) {
            .memory - card, .dark - memory {
              padding: 20px;
            margin: 40px 0;
            }

            .dialog-box {
              padding: 30px 20px;
            }
        }
          </style>
        </head>
        <body>
          <!-- 温馨部分 -->
          <section id="sunnySection" class="sunny-section">
            <div class="memory-card">
              <h1>给未来的你</h1>
              <p class="normal-text">未来的你，你好吗？希望我的生活片段能给你带来一丝温暖。</p>
            </div>

            <div class="memory-card">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600"
                alt="阳光海滩" class="memory-img">
                <p class="normal-text">这是我最喜欢的海滩，每当我感到压力时就会来这里。</p>
            </div>

            <div class="memory-card">
              <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600"
                alt="自然风景" class="memory-img">
                <p class="normal-text">大自然总是能治愈我的一切烦恼。</p>
            </div>

            <div class="memory-card trigger-card">
              <p class="normal-text">未来的你们的生活怎么样呢？一定也要像我的生活一样美好啊</p>
              <p class="normal-text">一点都不羡慕你们在那么遥远的未来...一点都不...</p>
            </div>

            <div class="memory-card">
              <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600"
                alt="森林小路" class="memory-img">
                <p class="distorted-text">带我走</p>
            </div>
          </section>

          <!-- 阴暗部分 -->
          <section id="darkSection" class="dark-section">
            <div class="dark-memory">
              <p>"今天好难受，什么也感觉不到。"</p>
              <img src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600"
                alt="红色天空" class="dark-img">
            </div>

            <div class="dark-memory">
              <p>"今天也讨厌自己，要去撞墙。"</p>
              <img src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?auto=format&fit=crop&w=600"
                alt="哥特建筑" class="dark-img">
            </div>

            <div id="finalCharacter" class="character-in-dialog"></div>
          </section>

          <!-- 小人容器 -->
          <div id="peekContainer" class="peek-container">
            <div class="peek-head">
              <div class="peek-eyes">
                <div class="eye"></div>
                <div class="eye"></div>
              </div>
            </div>
          </div>

          <!-- 崩溃效果 -->
          <div id="breakEffect" class="break-effect"></div>

          <!-- 对话框 -->
          <div id="dialogContainer" class="dialog-container">
            <div class="dialog-box">
              <div class="character-in-dialog"></div>
              <p class="dialog-message">那些，都只是一部分罢了</p>
              <div class="dialog-options">
                <button id="takeOption" class="dialog-btn">带走它</button>
                <button id="leaveOption" class="dialog-btn">不管它</button>
                <button id="notFutureOption" class="dialog-btn">我...并不来自未来</button>
              </div>

              <!-- 子选项 -->
              <div id="subOptions" class="dialog-options" style="display: none;">
                <button id="escapeOption" class="dialog-btn">因为我也想逃走</button>
                <button id="homeworkOption" class="dialog-btn">因为这是我们*****的**作业</button>
              </div>
            </div>
          </div>

          <script>
        // DOM元素
            const sunnySection = document.getElementById('sunnySection');
            const darkSection = document.getElementById('darkSection');
            const peekContainer = document.getElementById('peekContainer');
            const breakEffect = document.getElementById('breakEffect');
            const dialogContainer = document.getElementById('dialogContainer');
            const takeOption = document.getElementById('takeOption');
            const leaveOption = document.getElementById('leaveOption');
            const notFutureOption = document.getElementById('notFutureOption');
            const subOptions = document.getElementById('subOptions');
            const escapeOption = document.getElementById('escapeOption');
            const homeworkOption = document.getElementById('homeworkOption');
            const finalCharacter = document.getElementById('finalCharacter');

            // 小人状态
            let isPeeking = false;
            let hasTriggeredBreakdown = false;

            // 初始化
            function init() {
              // 随机放置小人
              movePeekContainer();

            // 添加滚动监听
            window.addEventListener('scroll', handleScroll);

            // 鼠标移动监听
            document.addEventListener('mousemove', handleMouseMove);

            // 设置选项事件监听
            setupEventListeners();

            // 初始隐藏小人
            peekContainer.style.opacity = '0';
        }

            // 处理滚动事件
            function handleScroll() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // 触发文字扭曲效果
            if (scrollY > documentHeight * 0.4 && !hasTriggeredBreakdown) {
                const distortedTexts = document.querySelectorAll('.distorted-text');
                distortedTexts.forEach(text => {
              text.classList.add('dragging-text');
                });

            // 显示小人
            peekContainer.style.opacity = '1';

                // 随机出现小人
                if (Math.random() > 0.7 && !isPeeking) {
              showPeek();
                }
            }

            // 触发崩溃效果
            if (scrollY > documentHeight * 0.7 && !hasTriggeredBreakdown) {
              triggerBreakdown();
            }
        }

            // 显示小人窥视
            function showPeek() {
              isPeeking = true;
            movePeekContainer();

            // 3秒后隐藏
            setTimeout(() => {
              peekContainer.style.opacity = '0';
            isPeeking = false;
            }, 3000);
        }

            // 移动小人位置
            function movePeekContainer() {
            const maxX = window.innerWidth - 100;
            const maxY = window.innerHeight - 100;

            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            peekContainer.style.left = `${randomX}px`;
            peekContainer.style.top = `${randomY}px`;
        }

            // 处理鼠标移动
            function handleMouseMove(e) {
            if (!isPeeking) return;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const rect = peekContainer.getBoundingClientRect();
            const charX = rect.left + rect.width / 2;
            const charY = rect.top + rect.height / 2;

            const distance = Math.sqrt(
            Math.pow(mouseX - charX, 2) +
            Math.pow(mouseY - charY, 2)
            );

            // 如果鼠标靠近小人
            if (distance < 200) {
              // 小人逃跑
              movePeekContainer();
            }
        }

            // 触发崩溃效果
            function triggerBreakdown() {
              hasTriggeredBreakdown = true;

            // 显示崩溃效果
            breakEffect.classList.add('visible');

            // 隐藏温馨部分，显示阴暗部分
            setTimeout(() => {
              sunnySection.classList.add('hidden');
            darkSection.classList.add('visible');
            breakEffect.classList.remove('visible');

            // 滚动到最底部
            window.scrollTo(0, document.body.scrollHeight);

            // 监听反向滚动
            window.addEventListener('scroll', handleReverseScroll);
            }, 2000);
        }

            // 处理反向滚动
            function handleReverseScroll() {
            const scrollY = window.scrollY;

            // 当滚动到顶部时显示对话框
            if (scrollY < 100) {
              dialogContainer.classList.add('visible');
            window.removeEventListener('scroll', handleReverseScroll);
            }
        }

            // 设置选项事件监听
            function setupEventListeners() {
              // 带走选项
              takeOption.addEventListener('click', () => {
                showMessage('谢谢');
                setTimeout(() => {
                  triggerDownload('PAST.zip');
                }, 1500);
              });

            // 不管选项
            leaveOption.addEventListener('click', () => {
              showMessage('又一个啊...');
                setTimeout(() => {
              window.location.reload();
                }, 2000);
            });

            // 不是未来选项
            notFutureOption.addEventListener('click', () => {
              subOptions.style.display = 'flex';
            });

            // 逃走选项
            escapeOption.addEventListener('click', () => {
              showMessage('谢谢');
                setTimeout(() => {
              triggerDownload('TO_THE_FUTURE.zip');
                }, 1500);
            });

            // 作业选项
            homeworkOption.addEventListener('click', () => {
              showMessage('啊...我看到你们了。那就这样吧。谢谢大家看我的拙劣演出，再见。');
                setTimeout(() => {
              window.location.reload();
                }, 3000);
            });
        }

            // 显示消息
            function showMessage(text) {
            const messageElement = document.querySelector('.dialog-message');
            messageElement.textContent = text;
        }

            // 触发文件下载
            function triggerDownload(filename) {
            // 在实际项目中，这里应该下载真实文件
            // 这里使用虚拟下载作为示例
            const link = document.createElement('a');
            link.href = '#'; // 实际项目中替换为真实文件URL
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

            // 初始化
            window.addEventListener('load', init);
          </script>
        </body>
      </html>