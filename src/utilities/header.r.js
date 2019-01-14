class Header {
  constructor(selector, toggleCallBack) {
    this.instance = selector;

    this.container = this.instance.querySelector('.main-section .container');
    this.headerMenu = this.instance.querySelector('.header-menu');
    this.menuToggleBtn = this.instance.querySelector('.menu-toggle-btn');
    this.headerMenuItems = this.instance.querySelectorAll('.header-menu__item');

    this.indicator = document.createElement('div');
    this.indicator.classList.add('indicator');

    this.toggleCallBack = toggleCallBack;

    this.adjustSubMenuStyle = this.adjustSubMenuStyle.bind(this);

    this.headerMenu.prepend(this.indicator);

    this.headerMenuItems.forEach(ele => {
      const navLink = ele.querySelector('.nav-link');
      const subMenu = ele.querySelector('.header-submenu');
      const toggleBtn = ele.querySelector('.toggle-btn');

      let subMenuTimer = null;

      navLink.onmouseover = () => {
        clearTimeout(subMenuTimer);

        if(window.innerWidth >= 992){
          const rect = this.container.getBoundingClientRect();
          const eleRect = ele.getBoundingClientRect();
          const eleLeft = eleRect.left - rect.left;
          const eleWidth = eleRect.width - 60;

          this.indicator.style.transform = `translate(${eleLeft + 30 + eleWidth/2}px, 0) scale(${eleWidth}, 1)`;

          if(subMenu){
            ele.classList.add('show');
          }
        }
      }

      if(subMenu){
        ele.onmouseover = () => { clearTimeout(subMenuTimer);}
        ele.onmouseout = () => {
          subMenuTimer = setTimeout(() => {
            clearTimeout(subMenuTimer);
            ele.classList.remove('show');
          }, 500);
        }

        toggleBtn.onclick = () => { 
          const allSubMenuItems = subMenu.querySelectorAll('.header-submenu__item');
          const subMenuHeight = ele.classList.contains('open') ? 0 : 37 * allSubMenuItems.length + 10;

          ele.classList.toggle('open');
          subMenu.style.maxHeight = `${subMenuHeight}px`;
        }
      }
    });

    this.menuToggleBtn.onclick = () => {
      document.body.classList.toggle('menu-mode');
    }

    window.onresize = () => {
      this.adjustSubMenuStyle();
    }

    this.adjustSubMenuStyle();
  }

  adjustSubMenuStyle() {
    this.headerMenuItems.forEach(ele => {
      const subMenu = ele.querySelector('.header-submenu');
      if(subMenu){
        const rect = this.container.getBoundingClientRect();
        const eleRect = ele.getBoundingClientRect();
        const eleLeft = window.innerWidth >= 992 ? eleRect.left - rect.left : 0;
        subMenu.style.paddingLeft = `${eleLeft}px`;
      }
    })
  }
}

export default Header;
