import { module, test } from 'qunit';
import { visit, currentURL, pauseTest,render  } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import click from '@ember/test-helpers/dom/click';

module('Acceptance | user', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /users', async function(assert) {
    await visit('/users');
    assert.equal(currentURL(), '/users', "On users page URL");
  });

  test('4 entries expected', async function(assert) {
    await visit('/users');

    // Checks that there are 4 cards present
    assert.dom(".column.user-card").exists({ count: 4 },"4 User profiles found");
  });

  test('1 entry expected', async function(assert) {
    await visit('/users');
    // Navigate to 1st User
    await this.element.querySelector('#ember-testing > div > div > div:nth-child(1) > a').click()

    // Checks that there is 1 card and for Albert Einstein
    const space_rgx = /[^\w]\s*[^\w]/ 
    assert.dom("div.user-profile").exists({ count: 1 },"1 User profiles found");
    assert.equal(this.element.querySelector('p.title').textContent.trim().split(space_rgx).join(" ").trim(), 'Albert Einstein', "Name is Albert Einstein");
    assert.equal(this.element.querySelector('#archive_label').textContent.trim().split("Archived:").join("").trim(), 'false', "Not archived status");
    assert.equal(this.element.querySelector('#archive_btn').textContent.trim(), 'Archive', "Archive button showing");
  });

  test('Archiving changes status and Button', async function(assert) {
    await visit('/users');
    // Navigate to 1st User
    await this.element.querySelector('#ember-testing > div > div > div:nth-child(1) > a').click()

    // Checks that there is 1 card and for Albert Einstein
    const space_rgx = /[^\w]\s*[^\w]/ 
    assert.dom("div.user-profile").exists({ count: 1 },"1 User profiles found");
    assert.equal(this.element.querySelector('p.title').textContent.trim().split(space_rgx).join(" ").trim(), 'Albert Einstein', "Name is Albert Einstein");
    assert.equal(this.element.querySelector('#archive_label').textContent.trim().split("Archived:").join("").trim(), 'false', "Has not archived status");

    // Launch confirmation Modal
    await click("#archive_btn")
    // Confirm archive
    await click("#modal_yes")
    assert.equal(this.element.querySelector('#archive_label').textContent.trim().split("Archived:").join("").trim(), 'true', "Has archived status");
    assert.equal(this.element.querySelector('#unarchive_btn').textContent.trim(), 'Unarchive', "Unarchive button showing");
  });

  test('Archived User hidden', async function(assert) {
    await visit('/users');
    // Navigate to 1st User
    await this.element.querySelector('#ember-testing > div > div > div:nth-child(1) > a').click()
    // Launch confirmation Modal
    await click("#archive_btn")
    // Confirm archive
    await click("#modal_yes")
    assert.equal(this.element.querySelector('#archive_label').textContent.trim().split("Archived:").join("").trim(), 'true', "Has archived status");
    assert.equal(this.element.querySelector('#unarchive_btn').textContent.trim(), 'Unarchive', "Unarchive button showing");
    
    // Go back to Users Index
    await click("#users_back")

    // Checks that there are 3 cards present
    assert.dom(".column.user-card").exists({ count: 3 },"3 User profiles found");

  });
});
