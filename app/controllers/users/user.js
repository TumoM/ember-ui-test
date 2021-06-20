import Controller from '@ember/controller';

// export default class UsersUserController extends Controller {
//     actions: {
//         archive: function() {
//             console.log("hello");
//         }
    
export default Ember.Controller.extend ({
    show_modal: false,
    actions: {
        close_confirmation() {
            Ember.Logger.info(`Archiving Cancelled`)
            this.set("show_modal",false)
        },
        confirm_archive(user){
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
        },
        show_modal() {
            Ember.Logger.info(`Launching Modal`)
            this.set("show_modal",true)
        }
    }
    }
    )
