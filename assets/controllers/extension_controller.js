import {Controller} from "@hotwired/stimulus"

export default class extends Controller {
    async toggleExtension() {
        const extensionName = this.element.querySelector('.extension-toggle')?.getAttribute('name');
        console.log(extensionName);
        const name = extensionName?.replace('extension-toggle-', '');
        console.log(name)
        await this.#waitForToggle(name);
    }

    async #waitForToggle(name) {
        try {
            const response = await fetch(`/api/extensions/v1/toggle/${encodeURIComponent(name)}`, {
                method: 'PATCH',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.log(response.status, await response.text());
                throw new Error('Failed to toggle extension');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async removeExtension() {
        const extensionName = this.element.querySelector('.extension-toggle')?.getAttribute('name');
        const name = extensionName?.replace('extension-toggle-', '');
        await this.#waitForRemove(name);
    }

    async #waitForRemove(name) {
        try {
            const response = await fetch(`/api/extensions/v1/remove/${encodeURIComponent(name)}`, {
                method: 'DELETE',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.log(response.status, await response.text());
                throw new Error('Failed to toggle extension');
            } else {
                // Select the closest parent element with the class 'extension-card'
                const extensionCard = this.element.closest('.extension-card');
                if (extensionCard) {
                    // Adding an animation class to fade out the card
                    extensionCard.classList.add('fade-out');
                    extensionCard.remove();
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}
