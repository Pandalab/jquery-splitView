(function($) {
  $.fn.extend({
    
    splitView: function(options) {
      
      var _this = this;
      
      var defaults = {
        tableViewDataSource: '',
        height: 500,
        width: "100%",
        tableViewWidth: "33%",
        detailViewWidth: "67%",
        noTableDataMessage: "No data",
        noDetailDataMessage: "Select an item on the left",
        dataReceived: function() { console.log('dataReceived callback not implemented! Pass it as an option to manage your data') },
        rowClicked: function() { console.log('rowClicked callback not implemented! Pass it as an option to load your data in the details view') }
      };
      
      this.options = $.extend(defaults, options);
      
      this.mainContainer = $('<div class="sv-main"></div>').css('height', this.options.height).css('width', this.options.width);
      var detailViewContainer = $('<div class="sv-detail-view-container"></div>').css('width', this.options.detailViewWidth);
      this.detailView = $('<div class="sv-detail-view"><div class="sv-no-detail-data">' + this.options.noDetailDataMessage + '</div></div>');
      detailViewContainer.append(this.detailView);
      var tableViewContainer = $('<div class="sv-table-view-container"></div>').css('width', this.options.tableViewWidth);
      this.tableView = $('<div class="sv-table-view"><div class="sv-no-tableview-data">' + this.options.noTableDataMessage + '</div></div>');
      tableViewContainer.append(this.tableView);
      this.mainContainer.append('<div class="sv-clear"></div>');

      $(this).append(this.mainContainer);
      this.mainContainer.append(tableViewContainer);
      this.mainContainer.append(detailViewContainer);
      
      $('.sv-no-detail-data').css('margin-top', (this.detailView.height() / 2) - 10);
      
      $.get(this.options.tableViewDataSource, function(data) {
        _this.options.dataReceived(data);
      }, 'json');
      
      // Add a row to the tableView
      this.addTableViewRow = function(title, description, date, data) {
        
        if ($(".sv-table-view .sv-no-tableview-data").length) {
          $(".sv-table-view .sv-no-tableview-data").remove();
        }
        
        var newRow = $('<div class="sv-table-view-row"></div>');
        var titleView = $('<div class="sv-title-view"></div>').html(title);
        var dateView = $('<div class="sv-date-view"></div>').html(date);
        var descriptionView = $('<div class="sv-description-view"></div>').html(description);

        this.tableView.append(newRow);
        newRow.data('sv-linked-data', data);
        newRow.click(function() {
          _this._rowClicked($(this));
        });
        newRow.append(titleView);
        newRow.append(dateView);
        newRow.append(descriptionView);
      }
      
      // Empty the table view
      this.emptyTableView = function() {
        this.tableView.html('<div class="sv-no-tableview-data">' + this.options.noTableDataMessage + '</div>');
      }

      // Load a view in the right panel
      this.loadDetail = function(detailContent) {
        $('.sv-no-detail-data').remove();
        this.detailView.html(detailContent);
      }
      
      // Private APIs
      // TableView row clicked
      this._rowClicked = function(source) {
        var linkedData = source.data('sv-linked-data');
        $('.sv-table-view .sv-selected').removeClass('sv-selected');
        source.addClass('sv-selected');
        _this.options.rowClicked(linkedData);
      }
      
      return this;
    }
    
  });
}(jQuery));