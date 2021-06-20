import Controller from '@ember/controller';

export default Ember.Controller.extend ({
    show_modal: false,
    actions: {
        close_confirmation() {
            Ember.Logger.info(`Archiving Cancelled`)
            this.set("show_modal",false)
        },
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
        },
        show_modal() {
            // Shows the archive confirmation model
            Ember.Logger.info(`Launching Modal`)
            this.set("show_modal",true)
        }
    }
    }
    )
