// Add listener for when the window is fully loaded
window.addEventListener("load", () => {
	// Retrieve the image uploader and gallery elements from the DOM
	const imageUploader = document.getElementById("imageUploader");
	const gallery = document.getElementById("gallery");

	// Add an event listener for image upload changes
	imageUploader.addEventListener("change", (event) => {
		// Convert the uploaded files into an array for easier processing
		const files = Array.from(event.target.files);

		// Loop through each uploaded file
		files.forEach((file) => {
			// Create a file reader to read the content of the file
			const reader = new FileReader();

			// Define what happens on file load
			reader.onload = (e) => {
				// Create an image element for each uploaded file
				const img = document.createElement("img");
				// Set the source of the image to the content of the file
				img.src = e.target.result;

				// Add styling class and make the image draggable
				img.classList.add("gallery-item");
				img.draggable = true;
				// Add drag and drop event listeners to the image
				addDragAndDropListeners(img);

				// Append the image to the gallery
				gallery.appendChild(img);
			};

			// Start reading the file as a Data URL
			reader.readAsDataURL(file);
		});
	});

	// Function to handle the start of dragging an image
	function handleDragStart(e) {
		// Set the data and allowed effects for dragging
		e.dataTransfer.setData("text/plain", e.target.src);
		e.dataTransfer.effectAllowed = "move";
		// Make the image semi-transparent while dragging
		this.style.opacity = "0.4";
	}

	// Function to handle dropping an image
	function handleDrop(e) {
		// Prevent the default behavior and stop event propagation
		e.preventDefault();
		e.stopPropagation();

		// Retrieve the dragged data (image source)
		const data = e.dataTransfer.getData("text/plain");
		// Create a new image element for the dropped image
		const targetImg = document.createElement("img");
		// Set the source and add class to the new image
		targetImg.src = data;
		targetImg.classList.add("gallery-item");
		targetImg.draggable = true;
		// Add drag and drop listeners to the new image
		addDragAndDropListeners(targetImg);
		// Replace the target (where the image is dropped) with the new image
		e.target.replaceWith(targetImg);
		// Reset the image's opacity to fully visible
		this.style.opacity = "1";
	}
	// Function to handle dragging an image over another image
	function handleDragOver(e) {
		// Prevent the default behavior and set the drop effect
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	}

	// Function to handle clicking on an image for zooming
	function handleImageClick(e) {
		// Create an overlay div for displaying the zoomed image
		const overlay = document.createElement("div");
		overlay.classList.add("overlay");
		overlay.style.display = "block";
		document.body.appendChild(overlay);

		// Clone the clicked image and add zoomed image styling
		const zoomedImage = e.target.cloneNode();
		zoomedImage.classList.add("zoomed-image");
		overlay.appendChild(zoomedImage);

		// Add a click event listener on the overlay to close the zoomed image
		overlay.addEventListener("click", function () {
			// Remove the overlay when clicked
			overlay.remove();
		});
	}

	// Function to add drag and drop listeners to an image
	function addDragAndDropListeners(img) {
		// Add event listeners for drag start, drag over, and drop
		img.addEventListener("dragstart", handleDragStart, false);
		img.addEventListener("dragover", handleDragOver, false);
		img.addEventListener("drop", handleDrop, false);
		// Add a click event listener for zooming functionality
		img.addEventListener("click", handleImageClick, false);
	}

	// Add an event listener for window resizing
	window.addEventListener("resize", () => {
		// Log a message when the gallery is resized
		// Useful for adjusting the gallery layout in response to window size changes
		console.log("Gallery resized");
	});
});
