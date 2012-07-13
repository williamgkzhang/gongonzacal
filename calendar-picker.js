function gongonzacal(container, onpick){
	this.initialized = false;
	this.onpick = onpick;
	this.container_name = container;
	this.root = document.getElementById(container);
	window.gongonza_cal = this;
	this.selected_date = null;
	this.selected_cell = null;
	this.current_date = new Date();
	this.current_date.setDate(1);
	this.current_date.setMonth(3);
	this.calendar_cells = []; //matrix of all the cell nodes;
	this.months_lookup = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	// Return if we can't find the container
	if(this.root != null){
		this.initialized = true;
	}
	else{
		return false;
	}

	//Set the Title Node
	this.title_node = get_child_by_id(get_child_by_id(this.root, "top_bar"), "title");

	//Set the Calendar Cells
	var cell_container = get_child_by_id(this.root, "calendar_cells");
	for(var i = 0; i < 6; i++){
		var row = [];
		for(var j = 0; j < 7; j++){
			var cell = get_child_by_id(cell_container, ("cell" + i) + j);
			row.push(cell);
		}
		this.calendar_cells.push(row);
	}

	//Populate the Calendar
	this.update_calendar();

}

gongonzacal.prototype.get_root = function(){ 
	return this.root; 
}
gongonzacal.prototype.set_title = function(title){
	this.title_node.innerText = title;
}
gongonzacal.prototype.set_cell_text = function(row, col, text){
	var link = this.calendar_cells[row][col].firstChild;
	link.innerText = text;
}
gongonzacal.prototype.get_cell_value = function(row, col){
	var retval = NaN;
	var link = this.calendar_cells[row][col].firstChild;
	retval = parseInt(link.innerText);
	return retval;
}

gongonzacal.prototype.select_cell = function(row, col){
	var cell = this.calendar_cells[row][col];
	var val = this.get_cell_value(row, col);

	if (!isNaN(val)){ //could add further bound checking here
		this.selected_date = new Date();
		this.selected_date.setDate(val);
		this.selected_date.setMonth(this.current_date.getMonth());
		this.selected_date.setFullYear(this.current_date.getFullYear());

		this.clear_selected_cell();

		//Mark the current cell
		this.selected_cell = cell;
		if(!cell.classList.contains("date_selected")){
			cell.classList.add("date_selected");
		}

		if(this.onpick != null){
			this.onpick(this.selected_date);
		}
	}
}

gongonzacal.prototype.clear_selected_cell = function(){
	if(this.selected_cell != null){
		if(this.selected_cell.classList.contains("date_selected")){
			this.selected_cell.classList.remove("date_selected");
		}
	}
	this.selected_cell = null;
}

gongonzacal.prototype.update_calendar = function(){
	var start_date = this.current_date.getDay();
	var current_day = 1;
	var end_day = this.days_in_month(this.current_date.getMonth(), this.current_date.getFullYear());

	//Set days preceding start date to empty
	for(var i = 0; i < start_date; i++){
		this.set_cell_text(0, i, "");
	}

	//Fill in the rest of the first week
	for(var i = start_date; i < 7; i++){
		this.set_cell_text(0, i, current_day);
		current_day++;
	}

	//Fill in rest of the weeks
	for(var i = 1; i < 6; i++){
		for(var j = 0; j < 7; j++){
			if(current_day <= end_day){
				this.set_cell_text(i, j, current_day);
				current_day++;
			}else{
				this.set_cell_text(i, j, "");
			}
		}
	}

	this.set_title(this.months_lookup[this.current_date.getMonth()] + " " + this.current_date.getFullYear());
}

gongonzacal.prototype.days_in_month = function(month, year){
	var days = 0;
	switch(month){
		case 0:
			days = 31;
			break;
		case 1:
			if (year % 4 == 0){
				days = 29;
			}else{
				days = 28;
			}
			break;
		case 2:
			days = 31;
			break;
		case 3:
			days = 30;
			break;
		case 4:
			days = 31;
			break;
		case 5:
			days = 30;
			break;
		case 6:
			days = 31;
			break;
		case 7:
			days = 31;
			break;
		case 8:
			days = 30;
			break;
		case 9:
			days = 31;
			break;
		case 10:
			days = 30;
			break;
		case 11:
			days = 31;
			break;
		default:
			days = 0 
			break;
	}
	return days;
}

function get_child_by_id(root, child_id){
	var child = null;

	for (i in root.children){
		if (root.children[i].id == child_id){
			child = root.children[i];
			break;
		}
	}
	return child;
}


