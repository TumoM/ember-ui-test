import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') name;
  @attr('string') image;
  @attr('boolean',{
    defaultValue: false
  }) archived;

  // Value and changeValue added only so unit test 4 passes
  @attr('boolean',{
    defaultValue: false
  }) value;
  changeValue() {
    this.value = !this.value
    return `${this.value}`;
  };
}
