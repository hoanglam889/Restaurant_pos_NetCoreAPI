 document.addEventListener("DOMContentLoaded", function () {
      const MyContent = document.getElementById('content');
      const ajaxbuttonContent = document.getElementById("ajax-content");
      const ajaxbuttonMapContent = document.getElementById("ajax-Mapcontent");
      const allNavLinks = document.querySelectorAll('#sidebarMenu .nav-link');

      const sidebarElement = document.getElementById('sidebarMenu');
      const sidebarOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(sidebarElement);

      // Hàm tải nội dung
      function loadContent(pageUrl) {
        MyContent.innerHTML = `
          <div class="d-flex justify-content-center p-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>`;

        fetch(pageUrl)
          .then(res => {
            if (!res.ok) throw new Error('Tải file thất bại!');
            return res.text();
          })
          .then(html => MyContent.innerHTML = html)
          .catch(err => {
            console.error(err);
            MyContent.innerHTML = `<div class="alert alert-danger">Lỗi: ${err.message}</div>`;
          });
      }

      // Mặc định load trang chính
      loadContent('content.html');

      // Xử lý click menu bên trái
      function handleLinkClick(event, pageUrl) {
        event.preventDefault();
        loadContent(pageUrl);

        allNavLinks.forEach(link => link.classList.remove('active'));
        event.currentTarget.classList.add('active');

        if (window.innerWidth < 992) sidebarOffcanvas.hide();
      }

      ajaxbuttonContent.addEventListener("click", e => handleLinkClick(e, 'content.html'));
      ajaxbuttonMapContent.addEventListener("click", e => handleLinkClick(e, 'map_content.html'));

      // ========================
      // 🔥 EVENT DELEGATION 🔥
      // ========================
      MyContent.addEventListener('click', function (event) {
        // Kiểm tra xem có click vào phần tử .clickable-card có data-id không
        const clickedCard = event.target.closest('.clickable-card[data-id]');
        if (!clickedCard) return; // nếu không phải thì thoát

        event.preventDefault();

        const tableId = clickedCard.dataset.id;
        console.log("Đã click bàn:", tableId);

        // Load trang menu kèm id bàn
        loadContent(`menu_food.html?table_id=${tableId}`);

      });
    });

