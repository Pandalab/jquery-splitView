# jQuery Split View #
This jQuery plugin builds a basic SplitView like the one on the iPad.
It gives callbacks to populate the content of the master and detail views.

## Examples ##
To get your split view set up import jQuery and the plugin files

    <link rel="stylesheet" href="jquery.splitView.css" type="text/css" charset="utf-8" />
    <script type="text/javascript" charset="utf-8" src="jquery.js"></script>
    <script type="text/javascript" charset="utf-8" src="jquery.splitView.js"></script>
    
and call the plugin on a div element like this:

    <div id="split-view"></div>
    <script type="text/javascript" charset="utf-8">
      $(document).ready(function() {
        var splitView = $("#split-view").splitView({
          noTableDataMessage: "No messages",
          noDetailDataMessage: "Select an item on the left to show it",
          tableViewDataSource: "http://www.example.com/data.json",
          dataReceived: function(data) {
            for (i in data.messages) {
              splitView.addTableViewRow(data.messages[i].title, data.messages[i].message.substr(0, 100), data.messages[i].date, { fullText: data.messages[i].message });
            }
          },
          rowClicked: function(data) {
            splitView.loadDetail(data.fullText);
          }
        });
      });
    </script>

