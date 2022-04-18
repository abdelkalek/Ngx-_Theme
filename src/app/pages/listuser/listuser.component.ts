import {Component, OnInit} from '@angular/core';
import {UserModel, UsersService} from "../users.service";

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {
  users: any = [];

  constructor(private userservice: UsersService) {
  }

  selectedRows: any;

  ngOnInit(): void {
    this.userservice.getUsers().subscribe((res) => {
      console.log(res);
      this.users = res;
      console.log(this.users)
    })
  }

  settings = {
    // mode: "external",
    actions: {
      // custom: [
      //   {
      //     name: 'edit',
      //     title: '<i class="nb-heart" title="YourAction"></i>'
      //   }],
      add: false,
      // edit: false,
      // delete: false,
      position: 'right',

    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      userName: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      }
    },
  };


  settings1 = {
    selectMode: 'multi',
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="nb-trash"></i>'
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      id: {
        title: 'ID',
      },
      username: {
        title: 'UserName',
      },
      email: {
        title: 'email',
      },
    },
  };


  // UserRowSelected Event handler
  onRowSelect(event:any) {
    this.selectedRows = event.selected;
  }

  // Get Selected button click handler
  onClick() {
    // It will console all the selected rows
    console.log(this.selectedRows);
  }

  onDeleteConfirm(event:any) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event:any) {
    console.log("Create Event In Console")
    console.log(event);

  }

  onSaveConfirm(event:any) {
    console.log("Edit Event In Console")
    console.log(event);
  }


}
