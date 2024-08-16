/**
 * @name AutoFollowUser
 * @author d3v.me
 * @description Ce plugin BetterDiscord vous permet de suivre automatiquement vos amis lorsqu'ils entrent dans un salon vocal.
 * @version 1.1.2
 */

module.exports = class AutoFollowUser {
    constructor() {
        this.currentUser = null; 
        this.followInterval = null; 
    }

    start() {
        this.applyUserContextMenuPatch();
    }

    stop() {
        this.removeUserContextMenuPatch();
        this.stopFollowInterval(); 
    }

    applyUserContextMenuPatch() {
        BdApi.ContextMenu.patch('user-context', this.modifyUserContextMenu);
    }

    removeUserContextMenuPatch() {
        BdApi.ContextMenu.unpatch('user-context', this.modifyUserContextMenu);
    }

    modifyUserContextMenu = (menu, { user }) => {
        const followOption = BdApi.React.createElement(BdApi.ContextMenu.Item, {
            id: `auto-follow-user-${user.id}`,
            label: this.currentUser === user.id ? 'UnFollow this user ❌' : 'Follow this user ✅',
            action: () => this.toggleUserFollow(user.id),
        });

        menu.props.children.push(followOption);
    };

    toggleUserFollow(userId) {
        if (this.currentUser === userId) {
            this.currentUser = null;
            this.stopFollowInterval();
        } else {
            if (this.currentUser) {
                this.stopFollowInterval();
            }

            this.currentUser = userId;
            this.startFollowInterval();
        }
    }

    startFollowInterval() {
        const VoiceStateStore = BdApi.findModuleByProps('getVoiceStateForUser');
        const VoiceChannelStore = BdApi.findModuleByProps('selectVoiceChannel');

        this.followInterval = setInterval(() => {
            const userVoiceState = VoiceStateStore.getVoiceStateForUser(this.currentUser);
            if (userVoiceState && userVoiceState.channelId) {
                const channelId = userVoiceState.channelId;
                VoiceChannelStore.selectVoiceChannel(channelId);
            }
        }, 1000);
    }

    stopFollowInterval() {
        if (this.followInterval) {
            clearInterval(this.followInterval);
            this.followInterval = null;
        }
    }
};
