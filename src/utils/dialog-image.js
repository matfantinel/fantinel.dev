if (typeof window !== 'undefined') {
	class DialogImage extends HTMLElement {
		constructor() {
			super();
		}
		
		connectedCallback() {
			// Get my image, should be one only.
			let img = this.querySelector('img');

			if(!img) {
				console.warn('dialog-image: No image found. Exiting.');
				return;
			}

			img.style.cursor = 'zoom-in';

			let parent = img.parentNode;
			
			let dialog = document.createElement('dialog');

			dialog.className = 'u-image-dialog';
			
			dialog.innerHTML = `
		  <form method="dialog">
				<img src="${img.src}">
				<button class="u-image-dialog__close-button" type="submit" aria-label="Close">×</button>
		  </form>
				`;
			parent.parentNode.insertBefore(dialog, parent.nextSibling);

			img.addEventListener('click', e => {
				e.preventDefault();
				dialog.showModal();
				setTimeout(() => {
					dialog.querySelector('button').focus();
				}, 100);
			});
		}

	}

	if(!customElements.get('dialog-image')) customElements.define('dialog-image', DialogImage);
}