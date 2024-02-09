import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  forwardRef, inject,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileLoaderComponent),
  multi: true
};

@Component({
  selector: 'pf-file-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-loader.component.html',
  styleUrl: './file-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class FileLoaderComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() public label: string = 'Выберите файл';
  @Input() public showIcon = true;

  private _value: File | undefined;
  private onChange?: (value: File | undefined) => void;
  private onTouched?: () => void;

  get value(): File | undefined {
    return this._value;
  }

  set value(v: File | undefined) {
    if (v !== this._value) {
      this._value = v;
      this.onChange?.(v);
    }
  }

  public onFileSelected(target: EventTarget | null): void {
    const files = (target as unknown as { files?: File[] }).files;

    if (!files?.length) {
      return;
    }

    this.value = files[0];
  }

  public onBlur() {
    this.onTouched?.();
  }

  public writeValue(value: File | undefined) {
    if (value !== this._value) {
      this._value = value;
      this.cdr.detectChanges();
    }
  }

  public registerOnChange(fn: (value: File | undefined) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}
