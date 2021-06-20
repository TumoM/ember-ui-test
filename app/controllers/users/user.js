import Controller from '@ember/controller';
import { action } from '@ember/object';
export default class UsersUserController extends Controller {
    show_modal = false;

    @action
    close_confirmation() {
        Ember.Logger.info(`Archiving Cancelled`)
        this.set("show_modal",false)
    }

    @action
    confirm_archive(user){
        // Runs after user confirms to archive
        Ember.Logger.info(`Archiving User`)
        user.archived = true
        user.save()
        .then((res) => {
            Ember.Logger.info(`Archived user ${user.id} - ${user.name}`)
            Ember.Logger.info(`Res ${res}`)
        })
        .catch(
            () => {
                Ember.Logger.info('failure to save');
            }
            );
        this.set("show_modal",false)
        // this.transitionToRoute('users')
    }

    @action
    show_modal() {
        // Shows the archive confirmation model
        Ember.Logger.info(`Launching Modal`)
        this.set("show_modal",true)
    }
}