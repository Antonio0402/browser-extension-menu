import {Controller} from "@hotwired/stimulus"

export default class extends Controller {

    static values = {
        darkIconUrl: String,
        lightIconUrl: String
    }

    // connect() {
    //     const switcher = this.element.querySelector('#theme-switcher');
    //     if (!switcher) return;
    //     switcher.addEventListener('change', this.toggleTheme.bind(this));
    // }

    toggleTheme(event) {
        event.preventDefault();
        const isChecked = event.currentTarget.checked;
        const theme = isChecked ? 'dark' : 'light';
        const icon = document.querySelector('.theme-switcher-icon');
        const darkIconUrlValue = event.currentTarget.dataset.themeDarkIconUrl;
        const lightIconUrlValue = event.currentTarget.dataset.themeLightIconUrl;
        if (theme === 'dark') {
            icon.setAttribute('src', darkIconUrlValue);
            document.documentElement.classList.add('dark');
        } else {
            icon.setAttribute('src', lightIconUrlValue);
            document.documentElement.classList.remove('dark');
        }
    }
}
