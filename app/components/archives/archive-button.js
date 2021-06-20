import Component from '@glimmer/component';
// import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ArchivesArchiveButtonComponent extends Component {
    @tracked show_modal = false;

    @action
    close_confirmation() {
        console.log(`Archiving Cancelled`)
        this.show_modal = false
    }

    @action
    unarchive(user){
        console.log(`Unarchiving User ${user.id} - ${user.name}`)
        user.archived = false
        user.save()
        .then((res) => {
            console.log(`Unarchived user ${user.id} - ${user.name}`)
            console.log(`Res ${res}`)
        })
        .catch(
            () => {
                console.log('failure to save');
            }
            );
    }

    @action
    confirm_archive(user){
        // Runs after user confirms to archive
        console.log(`Archiving User`)
        user.archived = true
        user.save()
        .then((res) => {
            console.log(`Archived user ${user.id} - ${user.name}`)
            console.log(`Res ${res}`)
        })
        .catch(
            () => {
                console.log('failure to save');
            }
            );
            this.show_modal = false
        // this.transitionToRoute('users')
    }

    @action
    show_modal_box() {
        // Shows the archive confirmation model
        console.log(`Launching Modal`)
        this.show_modal = true
    }
}
