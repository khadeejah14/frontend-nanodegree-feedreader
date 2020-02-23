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
       // test to make sure that the allFeeds variable has been defined and that it is not empty
       
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


       // test  in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
   

        it(' URL defined  and the URL is not empty', function () {
			for (let feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).toBeGreaterThan(0);
			}
		});
        // test in the allFeeds object and ensures it has a name defined  and that the name is not empty.
        
        it(' Name is defined and the name is not empty', function () {
			for (let feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).toBeGreaterThan(0);
			}
		});
    });


    //  test the menu
    describe('The Menu', function () {

        // Searches for the class of 'menu-hidden' in the body tag. If true, 
        // then the menu is hidden 
        it('menu element is hidden', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        // Toggles on click event if the menu appears or disappears
        it('working toggle on click event', function () {
            // Calls the class of 'menu-icon-link' 
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
        
    describe('Initial Entries', function () {
		//test that ensures when the loadFeed
		// function is called and completes its work.
		
		// Before loading the feed
		beforeEach(function (done) {
			loadFeed(0, done);
		});
		it('have at least one entry element in the feed container', function () {
			const entry = document.querySelectorAll('.feed .entry');
			expect(entry.length).toBeGreaterThan(0);
		});
	});
	// a new test suite named "New Feed Selection" 
	describe('New Feed Selection', function () {
		let initialFeed;
		//a test that ensures when a new feed is loaded
		
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
