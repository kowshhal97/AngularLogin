import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html' })

export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }


    fileContent: any;
    saveAsProject(){
        let res=""
        res+="First Name : "+this.currentUser.firstName+"\nLast Name : "+this.currentUser.lastName+"\nEmail-Id : "+this.currentUser.username
        //you can enter your own file name and extension
        this.writeContents(res, 'user'+'.txt', 'text/plain');
      }
      writeContents(content, fileName, contentType) {
        var a = document.createElement('a');
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
      }





    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}