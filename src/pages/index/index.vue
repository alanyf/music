<template>
    <div class="index-container">
        <header class="header">
            <div class="letf-sidebar-button">
                <van-icon
                    name="wap-nav"
                    @click.stop="showSidebar"/>
            </div>
            <div class="link-tabs">
                <div
                    v-for="(tab, i) in tabsArr"
                    :key="tab.to"
                    :class="`link-tab ${focus(tab, i)}`">
                    <router-link :to="tab.to">{{ tab.text }}</router-link>
                </div>
            </div>
            <div class="search-button">
                <router-link to="/music/search"><van-icon name="search"/></router-link>
            </div>
        </header>
        <article class="main-content">
            <router-view/>
        </article>
        <footer class="footer"> <BottomPlayer/></footer>
        <Account
            ref="accountSidebar"
            :is-show="isShowSidebar"
            @hiddenSidebar="hiddenSidebar"/>
    </div>
</template>

<script>
    import Account from '../account/account';
    import BottomPlayer from '../../components/BottomPlayer';
    export default {
        name: 'Index',
        components: {
            Account,
            BottomPlayer
        },
        data() {
            return {
                tabsArr: [
                    {text: '我的', to: '/my'},
                    {text: '发现', to: '/find'},
                    {text: '朋友', to: '/friend'},
                    {text: '视频', to: '/video'}
                ],
                isShowSidebar: false
            };
        },
        computed: {

        },
        mounted() {
            const path = this.$route.path;
            console.log();
        },
        methods: {
            showSidebar() {
                this.$refs.accountSidebar.show();
                this.$store.commit('changeIsShowSidebar', true);
            },
            hiddenSidebar() {
                this.$store.commit('changeIsShowSidebar', false);
            },
            focus(tab, index) {
                return (this.$route.path === tab.to || (this.$route.path === '/music/index' && index === 1)) ? 'focus' : '';
            }
        }
    };
</script>

<style lang="less">

	.index-container{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		font-size: 0.5rem;
		background-color: #fff;
		.van-icon{
			font-size: 0.6rem;
		}
		.header{
			display: flex;
			height: 1.5rem;
			width: 100%;
			flex-grow: 1;
			flex-shrink: 1;
			position: fixed;
			background-color: #fff;
			align-items: center;
			top: 0;
			z-index: 2;
			.letf-sidebar-button{
				flex-basis: 1.5rem;
			}
			.link-tabs{
				flex-basis: 6.5rem;
				flex-grow: 1;
				display: flex;
				margin: 0 0.5rem;
				.link-tab{
					flex-grow: 1;
					font-size: 0.5rem;
					text-align: center;
					color: #2c3e50;
					&:active{
						text-decoration: none;
					}
				}
				.focus{
					font-size: 0.55rem;
					color: #000;
					font-weight: bolder;
				}
			}
			.search-button{
				flex-basis: 2rem;
			}
		}
		.main-content{
			display: flex;
			flex-basis: 16rem;
			flex-grow: 1;
			flex-shrink: 1;
			margin: 1.5rem 0;
			background-color: #fff;
			overflow: scroll;
		}
		// .footer{
		// 	position: fixed;
		// 	bottom: 0;
		// }
	}
</style>
