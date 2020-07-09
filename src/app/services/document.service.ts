import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Document } from '../models/document';
import { ConfirmData } from '../models/confirm-data';
import { RESOLUTIONS } from '../constants/resolutions';

const DOCUMENT = {
  id: 1,
  title: 'Lorem Ipsum',
  text: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed odio accumsan, egestas mi pulvinar, egestas augue. Sed ac ornare nulla. Suspendisse at sodales est. Donec eget nisl at orci gravida convallis vitae eu velit. Curabitur vitae vulputate sapien. Curabitur cursus id eros ac placerat. Donec rutrum ex a nisi eleifend dignissim a ut ex. Nulla facilisi. Mauris neque dolor, elementum quis aliquam eu, auctor non nisl.
    Proin laoreet dolor id tristique ultricies. Maecenas tincidunt ante non nunc blandit, quis dignissim ex pharetra. Curabitur id ultricies lorem. Fusce vestibulum sapien non mauris scelerisque ornare. Donec a ex eu augue congue condimentum vel eget metus. Maecenas ac lorem at turpis blandit bibendum a sit amet justo. Curabitur imperdiet nisl neque, sit amet dictum lorem porttitor a. Duis a porta diam.
    Vivamus dignissim, ligula ac finibus blandit, ex ligula efficitur libero, id rhoncus est elit a nulla. Sed sed hendrerit diam, ac blandit urna. Aliquam erat volutpat. Sed ac magna eu libero gravida tristique a eu ipsum. Integer ut felis nisl. Cras pulvinar, enim eget gravida mattis, velit mauris elementum magna, id finibus dolor urna sed neque. Mauris at imperdiet diam, efficitur dignissim turpis. Duis viverra ex sit amet neque lacinia, ut volutpat elit pretium. Integer eu rhoncus est. Sed felis velit, posuere id cursus nec, feugiat id quam.
    Duis magna elit, aliquet at euismod id, commodo ut massa. Sed mollis nulla sed turpis sodales accumsan. In eu porta lorem, in vestibulum elit. In viverra tristique odio ut posuere. Mauris convallis nibh vitae tellus ultrices efficitur commodo commodo tellus. Pellentesque id nisi ligula. Donec congue metus vitae leo semper pulvinar. Vestibulum nec dui a est efficitur finibus eu eget sapien. Duis accumsan in leo a malesuada. Aliquam placerat lectus quis porta convallis. Donec aliquam pulvinar turpis sed ornare.
    Vivamus a bibendum nunc, ac cursus magna. Donec finibus, nibh eget aliquet volutpat, augue sapien fringilla nunc, in gravida purus ante vel nisl. Sed ac pharetra ligula. Ut lacinia consectetur tempus.
    Sed ut sem vestibulum, porta lectus eu, aliquam enim. Sed et dui eros. Sed pulvinar mi erat, non interdum enim molestie bibendum. Cras nec massa ligula. Nam viverra arcu eu nunc blandit, a ornare velit bibendum. Aenean vel nisi egestas, vulputate dui quis, suscipit quam. Nulla iaculis neque et facilisis fringilla. Aliquam quis leo in odio efficitur gravida sit amet malesuada sapien.
    Nullam enim lorem, venenatis eget quam id, blandit egestas neque. Nunc commodo eleifend lectus quis semper. Vestibulum posuere arcu vitae nunc tristique, eu accumsan quam suscipit. Duis semper, mi sit amet ornare pharetra, tortor dolor vulputate ante, quis molestie ante augue at purus. Phasellus tempus tortor eros, eu rhoncus ex congue quis. Proin blandit turpis vitae purus ultricies rutrum.
  `
};

interface ResponseWrapper<T> {
  status: 200;
  data: T;
}

/**
 * Сервис документа
 */
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  /**
   * Возвращает документ
   */
  getDocument(id: number): Observable<ResponseWrapper<Document>> {
    if (id === DOCUMENT.id) {
      return of({
        status: 200,
        data: DOCUMENT
      });
    }
  }

  /**
   * Подтвержадет документ
   */
  confirm(data: ConfirmData): Observable<ResponseWrapper<string>>  {
    const { approver, state, resolution, comment } = data;
    const confirmComment = comment ? ` с коментарием «${comment}».` : '.';
    const confirmResolution = RESOLUTIONS.find(item => item.code === resolution).text;
    return of({
      status: 200,
      data: `Пользователь ${approver} ${state ? 'утвердил' : 'отклонил'} документ с резолюцией «${confirmResolution}»${confirmComment}`
    });
  }
}
