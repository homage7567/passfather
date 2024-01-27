import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileLoaderComponent),
  multi: true,
};

@Component({
  selector: 'pf-file-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-loader.component.html',
  styleUrl: './file-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class FileLoaderComponent implements ControlValueAccessor {
  @Input() label: string = 'Выберите файл';
  @Input() showIcon = true;

  private _value: File | undefined;
  private onChange?: (value: string) => void;
  private onTouched?: () => void;

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange?.(v);
    }
  }

  public onFileSelected(event: any): void {
    if (!event.target.files?.length) {
      return;
    }

    this.value = event.target.files[0];
  }

  public onBlur() {
    this.onTouched?.();
  }

  public writeValue(value: any) {
    if (value !== this._value) {
      this._value = value;
    }
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
