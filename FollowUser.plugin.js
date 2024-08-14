/**
 * @name AutoFollowUser
 * @author d3v.me
 * @description This BetterDiscord plugin lets you automatically follow your friends when they enter a voice chat room.
 * @version 1.1.2
 */

module.exports = class AutoFollowSingleUser {
    constructor() {
        this.followingUser = null; 
        this.interval = null; 
    }

    start() {
        this.patchUserContextMenu();
    }

    stop() {
        this.unpatchUserContextMenu();
        this.clearInterval(); 
    }

    patchUserContextMenu() {
        BdApi.ContextMenu.patch('user-context', this.handleUserContextMenu);
    }

    unpatchUserContextMenu() {
        BdApi.ContextMenu.unpatch('user-context', this.handleUserContextMenu);
    }

    handleUserContextMenu = (menu, { user }) => {
       
        const followUserOption = BdApi.React.createElement(BdApi.ContextMenu.Item, {
            id: `auto-follow-user-${user.id}`,
            label: this.followingUser === user.id ? 'Ne plus suivre cet utilisateur' : 'Suivre cet utilisateur',
            action: () => this.toggleFollowUser(user.id),
        });

        menu.props.children.push(followUserOption);
    };

    toggleFollowUser(userId) {
        if (this.followingUser === userId) {
         
            this.followingUser = null;
            this.clearInterval();
        } else {
       
            if (this.followingUser) {
                this.clearInterval();
            }

            this.followingUser = userId;
            this.startUserInterval();
        }
    }

    startUserInterval() {
        const VoiceStateStore = BdApi.findModuleByProps('getVoiceStateForUser');
        const VoiceChannelStore = BdApi.findModuleByProps('selectVoiceChannel');

        this.interval = setInterval(() => {
            const userVoiceState = VoiceStateStore.getVoiceStateForUser(this.followingUser);
            if (userVoiceState && userVoiceState.channelId) {
                const currentChannelId = userVoiceState.channelId;
                VoiceChannelStore.selectVoiceChannel(currentChannelId);
            }
        }, 1000);
    }

    clearInterval() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
};
