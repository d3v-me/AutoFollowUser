/**
 * @name AutoFollowUser
 * @author d3v.me
 * @description This BetterDiscord plugin lets you automatically follow your friends when they enter a voice chat room.
 * @version 1.1.3
 */

module.exports = class AutoFollowUser {
    constructor() {
        this.followingUser = null;
        this.followInterval = null;
        this.patched = false;
    }

    start() {
        this.patchUserContextMenu();
    }

    stop() {
        this.unpatchUserContextMenu();
        this.clearFollowInterval();
    }

    patchUserContextMenu() {
        if (!this.patched) {
            BdApi.ContextMenu.patch('user-context', this.handleUserContextMenu);
            this.patched = true;
        }
    }

    unpatchUserContextMenu() {
        if (this.patched) {
            BdApi.ContextMenu.unpatch('user-context', this.handleUserContextMenu);
            this.patched = false;
        }
    }

    handleUserContextMenu = (menu, { user }) => {
        const isFollowing = this.followingUser === user.id;
        const followUserOption = BdApi.React.createElement(BdApi.ContextMenu.Item, {
            id: `auto-follow-user-${user.id}`,
            label: isFollowing ? 'UnFollow this user ❌' : 'Follow this user ✅',
            action: () => this.toggleFollowUser(user.id),
        });

        menu.props.children.push(followUserOption);
    };

    toggleFollowUser(userId) {
        if (this.followingUser === userId) {
            this.stopFollowingUser();
        } else {
            if (this.followingUser) {
                this.stopFollowingUser();
            }
            this.startFollowingUser(userId);
        }
    }

    startFollowingUser(userId) {
        this.followingUser = userId;
        this.startFollowInterval();
    }

    stopFollowingUser() {
        this.followingUser = null;
        this.clearFollowInterval();
    }

    startFollowInterval() {
        const VoiceStateStore = BdApi.findModuleByProps('getVoiceStateForUser');
        const VoiceChannelStore = BdApi.findModuleByProps('selectVoiceChannel');

        if (!VoiceStateStore || !VoiceChannelStore) {
            console.error("Required modules not found");
            return;
        }

        this.followInterval = setInterval(() => {
            const userVoiceState = VoiceStateStore.getVoiceStateForUser(this.followingUser);
            if (userVoiceState && userVoiceState.channelId) {
                VoiceChannelStore.selectVoiceChannel(userVoiceState.channelId);
            }
        }, 1000);
    }

    clearFollowInterval() {
        if (this.followInterval) {
            clearInterval(this.followInterval);
            this.followInterval = null;
        }
    }
};
