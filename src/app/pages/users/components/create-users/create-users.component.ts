import { Component, OnInit } from '@angular/core';
import { FormTrainDocsComponent } from "../../../../shared/components/form-train-docs/form-train-docs.component";
import { FileUploaderComponent } from "../../../../shared/components/file-uploader/file-uploader.component";
import { FormCreateUserComponent } from "../../../../shared/components/form-create-user/form-create-user.component";
import { UserCardComponent } from "../../../../shared/components/user-card/user-card.component";
import { ApiService } from '../../../../services/api/api.service';
import { User } from '../../../../interfaces/leads.interface';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
    selector: 'app-create-users',
    standalone: true,
    templateUrl: './create-users.component.html',
    styleUrl: './create-users.component.scss',
    imports: [FileUploaderComponent, FormCreateUserComponent, UserCardComponent]
})
export class CreateUsersComponent implements OnInit {

    users: User[] = []
    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.getUser()
    }

    getUser(){
        this.apiService.getUsers().subscribe((res) => {
            this.users = res
        })
    }

    filesToTraining: File[] = []
    clearFiles: boolean = false
    

    handleRemove(id: string){
        this.apiService.deleteUser(id).subscribe((res) => {
            if(res.success){
                this.getUser()
                this.notificationService.open({
                    title: `Eliminacion Exitosa!`,
                    message: `El Closer ${res.data.name} fue eliminado con exito!`,
                    clase: 'success'
                })
            }else {
                this.notificationService.open({
                    title: `Error!`,
                    message: `No se pudo eliminar el Closer ${res.data.name}`,
                    clase: 'error'
                })
            }
        })
    }

    handleClearForm(event: boolean){
        this.clearFiles = event
    }

    handleSave(event: boolean){
        if(event)
        this.getUser()
    }

}
