var config = {};

$(function() {
    //get viewport size and ratio
    var $swidth = $(window).width(),
        $sheight = $(window).height(),
        $sratio = $swidth/$sheight;

    /**
    //Horizontal viewport
    if ($sratio>1) {
        $rowtriangle = 6,
        $coltriangle = 8
    //Vertical viewport
    } else if ($sratio<1) {
        $rowtriangle = 4,
        $coltriangle = 10
    } else if ($sratio<0.6) {
        $rowtriangle = 4,
        $coltriangle = 13
    }
    **/
    //Horizontal viewport
    if ($sratio>1) {
        $triwidth = 0.5,
        $triheight = 1.2,
        $rowtriangle = 6,
        $coltriangle = 8;
        $(".slogan").addClass("light");

    //Vertical viewport
    } else if ($sratio<1) {
        $triwidth = 1.2,
        $triheight = 0.5,
        $rowtriangle = 8,
        $coltriangle = 6;
        $(".slogan").addClass("dark");
    };


    var $body = $(document.body),
        $window = $(window);

    // Background
    var canvas = document.createElement('canvas');
    //var wwidth = $( window ).width();
    //var hheight = $( window ).height();
    //var rratio = wwidth / hheight;
	
    backgroundEnabled = canvas.getContext && canvas.getContext('2d') && $('#background-container').css('display') != 'none';

    if (backgroundEnabled) {
        config.background = {
            enabled: true,

            RENDER: {
				// Takes all the information in a Scene and renders it to a context.
                // A Scene sits at the very top of the stack. It simply manages arrays of Mesh & Light objects.
				renderer: 'canvas'
            },

             MESH: {
                ambient: '#BFA7DB', // Default 
                diffuse: '#F2B385', // Default
                width: $triwidth, // Triangle Width
                height: $triheight, // Triangle Height
                depth: 10, // Transparency of the triangles
                segments: $rowtriangle, // Number of triangles to display in 1 row
                slices: $coltriangle, // Number of triangles to display in 1 column
                xRange: 0.6, // Wideness of the triangles in X Position
                yRange: 0.5, // Wideness of the triangles in Y Position
                zRange: 1.0, // Wideness of the triangles in Z Position
                speed: 0.00025 // Speed of the moving traingles
            },

            LIGHT: {
                autopilot: true, // Set this to true if you want the light to follow your mouse cursor
                ambient: '#BFA7DB',
                diffuse: '#F2B385',
                count: 1, // Contrast 
                zOffset: 180,
                
                xyScalar: 1,
                speed: 0.0005,
                gravity: 1200,
                dampening: 0.15,
                minLimit: 8,
                maxLimit: null,
                minDistance: 20,
                maxDistance: 400,
                draw: false // Set to true if you want to just draw a background image (static).
            }
        }

		// Ready made themes
		// The styles replaces the daufault colors when a class is defined on the body tag.
        if ($body.hasClass('theme-ice')) {
            config.background.LIGHT.ambient = '#1165A4';
            config.background.LIGHT.diffuse = '#514311';
        } else if ($body.hasClass('theme-nature')) {
            config.background.LIGHT.ambient = '#00935B';
            config.background.LIGHT.diffuse = '#02480A';
        } else if ($body.hasClass('theme-sea')) {
            config.background.LIGHT.ambient = '#76E4CE';
            config.background.LIGHT.diffuse = '#0E411F';
            config.background.LIGHT.zOffset = 100;
        } else if ($body.hasClass('theme-candy')) {
            config.background.LIGHT.ambient = '#A42D71';
            config.background.LIGHT.diffuse = '#4E2F1B';
        } else if ($body.hasClass('theme-peach')) {
            config.background.LIGHT.ambient = '#FF7171';
            config.background.LIGHT.diffuse = '#895321';
            config.background.LIGHT.zOffset = 100;
        } else if ($body.hasClass('theme-light')) {
            config.background.LIGHT.ambient = '#DBAA95';
            config.background.LIGHT.diffuse = '#4F460B';
        } else if ($body.hasClass('theme-darkness')) {
            config.background.LIGHT.ambient = '#3C3C3C';
            config.background.LIGHT.diffuse = '#494949';
            config.background.LIGHT.zOffset = 200;
        } else if ($body.hasClass('theme-joris')) {
            config.background.LIGHT.ambient = '#00A8FF';
            config.background.LIGHT.diffuse = '#0fAfFb';
            config.background.LIGHT.zOffset = 200;
        } else if ($body.hasClass('theme-custom')) {
            // CURRENTLY ACTIVE THEME
            config.background.LIGHT.ambient = '#F9BB22';
            config.background.LIGHT.diffuse = '#FFC22C';
            config.background.LIGHT.zOffset = 200;
        }

        //Responsive
        //if (($( window ).width() / $( window ).height()) < 2) {
        //    config.background.MESH.slices = 10;
        //} else if (($( window ).width()) < 750) {
        //    config.background.MESH.width = 1.2;
        // }
		
		// Initialize the background
        initBackground();
    }
});