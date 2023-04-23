import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tagKeyword'
})
export class TagKeywordPipe implements PipeTransform {

    transform(value: string): string {

        let keyword = "monetary|financial|cross border|payments|swift|currency|legal tender";
        const regex = new RegExp(keyword, 'gi');

        return value.replace(regex, `<strong class='keyword'>$&</strong>`);
    }

}