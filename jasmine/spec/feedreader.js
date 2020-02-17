/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it(' URL defined  and the URL is not empty', function () {
			for (let feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).toBeGreaterThan(0);
			}
		});
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it(' Name is defined and the name is not empty', function () {
			for (let feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).toBeGreaterThan(0);
			}
		});
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
		const menu = document.querySelector('body');

		/* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

		it('is hidden by default', function () {
			expect(menu.classList).toContain("menu-hidden");
		});

        
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('shows when the menu icon is clicked', function () {
			menu.classList.toggle('menu-hidden');
			expect(menu.classList.contains('menu-hidden')).toBe(false);
		});

		it('hides when the menu icon is clicked again', function () {
			menu.classList.toggle('menu-hidden');
			expect(menu.classList.contains('menu-hidden')).toBe(true);
        });
    });
        
    describe('Initial Entries', function () {
		/* TODO: Write a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		// Before loading the feed
		beforeEach(function (done) {
			loadFeed(0, done);
		});
		it('have at least one entry element in the feed container', function () {
			const entry = document.querySelectorAll('.feed .entry');
			expect(entry.length).toBeGreaterThan(0);
		});
	});
	/* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function () {
		let initialFeed;
		/*TODO: Write a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */
		beforeEach(function (done) {
			loadFeed(0, function () {
				initialFeed = document.querySelector('.feed').textContent;
				loadFeed(1, done);
			});
		});
		it('content changes when the feed reloads', function (done) {
			const secondFeed = document.querySelector(".feed").textContent;
			expect(initialFeed).not.toEqual(secondFeed);
			done();
		});
	});
}());