import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | archives/archive-button', function(hooks) {
  setupRenderingTest(hooks);

  test('archive button present', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Archives::ArchiveButton />`);

    assert.equal(this.element.querySelector('button.arch_btn').textContent.trim(), 'Archive',"Archive button has correct text");
  });

  test('modal shows and hides', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Archives::ArchiveButton />`);

    // Checks the default button text is Archive
    assert.ok((this.element.querySelector('button#archive_btn')).offsetParent,"Archive button is visible")
    assert.equal(this.element.querySelector('button#archive_btn').textContent.trim(), 'Archive', "Archive button has correct text");

    // Modal elements (buttons) are not visible
    assert.equal((this.element.querySelector('button#modal_yes')).offsetParent,null,"Yes button not visible")
    assert.equal((this.element.querySelector('button#modal_no')).offsetParent,null,"No button not visible")

    // Launch Modal and check buttons are there
    await click('button.arch_btn')
    assert.ok((this.element.querySelector('button#modal_yes')).offsetParent,"Yes button visible")
    assert.ok((this.element.querySelector('button#modal_no')).offsetParent,"No button visible")
    // assert.equal((this.element.querySelector('button#archive_btn')).offsetParent,null,"Archive button not visible")


    // Closes modal and checks that modal buttons are not present
    await click("button#modal_no")
    assert.equal((this.element.querySelector('button#modal_yes')).offsetParent,null,"Yes button not visible")
    assert.equal((this.element.querySelector('button#modal_no')).offsetParent,null,"No button not visible")

    // Check the button is still the same
    assert.ok((this.element.querySelector('button#archive_btn')).offsetParent,"Archive button is visible")
    assert.equal(this.element.querySelector('button.arch_btn').textContent.trim(), 'Archive', "Archive button text correct");

  });
});
