function reproduction() {
    const tabs = document.querySelectorAll('.reproduction__tab'),
          tabs_ul = document.querySelector('.reproduction__tabs'),
          tabscContent = document.querySelectorAll('.reproduction__content')


    function showActiveTab (i = 0) {
        tabs[i].classList.add('reproduction__tab_active')
        tabscContent.forEach((tab) => {
            hideActiveTabs(tab, 'reproduction__content_active')
            if (tabs[i].dataset.country == tab.id) {
                tab.classList.add('reproduction__content_active')
            }
        })
    }
    function hideActiveTabs(tab, ActiveClass){
        tab.classList.remove(ActiveClass)
    }
    tabs_ul.addEventListener('click',(e) => {
        if (e.target && e.target.classList.contains('reproduction__tab')) {
            tabs.forEach((tab, i) => {
                hideActiveTabs(tab, 'reproduction__tab_active')
                if(tab == e.target) {
                    showActiveTab(i)
                } 
            })
            
        }
    })


}
 export default reproduction;