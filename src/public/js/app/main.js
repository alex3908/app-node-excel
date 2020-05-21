define(["jquery", "tableexport"], function($, TableExport) {

    // DOM ready
    $(function() {

        // Initialize TableExport using jQuery.
        $('#example').tableExport({
            bootstrap: true,
            formats: ["xlsx"],
            ignoreCols: [6]
        });

        // Initialize TableExport using vanilla JS.
    });

});