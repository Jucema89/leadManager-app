import { Component } from '@angular/core';
import { TableTrainAIComponent } from "../../../../shared/components/table-train-ai/table-train-ai.component";
import { IStaticMethods } from 'preline';
import { ApiService } from '../../../../services/api/api.service';
import { LocalStorageService } from '../../../../services/localStorage/localstorage.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BadgeStatusComponent } from '../../../../shared/components/badge-status/badge-status.component';
import { IconFilesComponent } from '../../../../shared/components/icon-files/icon-files.component';
import { Lead, StateLead } from '../../../../interfaces/leads.interface';
import { NotificationService } from '../../../../services/notification/notification.service';

declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

@Component({
    selector: 'app-table-lead',  
    standalone: true,
    templateUrl: './table-lead.component.html',
    styleUrl: './table-lead.component.scss',
    imports: [CommonModule, RouterLink, BadgeStatusComponent, IconFilesComponent]
})
export class TableLeadsComponent {
    leads: Lead[] = []
    lodingRow: boolean = true
  
    tableHeader: string[] = [
      'Agendacion',
      'Email',
      'Utm_source',
      'State',
      'Closer',
      ''
    ]
    messageNeedConfig: boolean = true
  
    constructor(
      private apiService: ApiService,
      private notification: NotificationService,
      private localStorageService: LocalStorageService,
    ){}
    
    ngOnInit(): void {
      this.getLeads()
    }
  
    gotoOpenAIChat(modelId: string){
      window.open(`https://platform.openai.com/playground/chat?models=${modelId}`, '_blank');
    }
  
  
    async getLeads(){
        this.apiService.getLeads().subscribe((leads) => {
          this.leads = leads
          this.lodingRow = false
          setTimeout(() => {
            window.HSStaticMethods.autoInit();
          }, 100);
        })
    }

    handlerStatus(status: StateLead): { type: string, message: string }{
      switch (status) {
        case 'in_call':
          return {type: 'warning', message: 'En Llamada'}
          break;
  
        case 'lose':
          return {type: 'danger', message: 'Perdida'}
          break;
  
        case 'win':
          return { type: 'success', message: 'Ganada'}
          break;
  
        case 'await_answer':
          return { type: 'info', message: 'En Espera'}
          break;

        case 'unmanaged':
          return { type: 'normal', message: 'Sin gestionar'}
          break;

        case 'contacted':
          return { type: 'info', message: 'Contactado'}
          break;
      
        default:
          return { type: 'normal', message: 'En curso'}
          break;
      }
    }
  
    handleTypeFile(ext: string): string{
      if(ext === 'txt' || ext === 'docx' || ext === 'doc'){
        return 'word'
      }
  
      if(ext === 'pdf' || ext === 'PDF'){
        return 'pdf'
      }
  
      if(ext === 'xls' || ext === 'xlsx'){
        return 'excel'
      }
  
      if(ext === 'png' || ext === 'jpg' || ext === 'jpeg'){
        return 'image'
      }
  
      if(ext === 'ppt' || ext === 'pptx'){
        return 'presentation'
      }
  
      if(ext === 'zip' || ext === 'rar'){
        return 'zip'
      }
  
      else return ''
    }
  
    changeStatus(idRow: number, status: StateLead){
        this.apiService.changeStatus(idRow, status).subscribe((response) => {
            if(response.success){
                this.notification.open({
                    title: 'Lead Actualizado',
                    clase: 'success',
                    message: response.message
                })
                this.getLeads()
            } else {
                this.notification.open({
                    title: 'Error al Actualizar',
                    clase: 'error',
                    message: response.message
                })
            }
        })
    }

}
