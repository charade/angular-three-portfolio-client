import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonGroupComponent } from '../../../../shared-components/button-group/button-group.component';
import { AppIconComponent } from '../../../../shared-components/icon/icon.component';
import { IconEnum } from '../../../../shared-components/icon/icon.enums';
import { OverlayRefToken } from '../../../../shared-services/overlay/overlay.service';
import { LanguageEnum } from '../../../../common-utils/enums/languages.enum';
import { CheckboxComponent } from 'src/app/shared-components/checkbox/checkbox.component';

@Component({
  standalone: true,
  selector: 'app-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss'],
  imports: [
    AppIconComponent,
    TranslateModule,
    ButtonGroupComponent,
    CheckboxComponent,
  ],
})
export class LanguageMenuComponent {
  IconEnum = IconEnum;
  #overlayRef = inject(OverlayRefToken);
  LanguageEnum = LanguageEnum;
  disableSubtitle = false;

  closeModal() {
    this.#overlayRef.dispose();
  }
}
