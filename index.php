<?php
/**
 * @link              https://pintopsolutions.com/happy-giver-block
 * @since             1.0.0
 * @package           Happy_Giver_Block
 *
 * @wordpress-plugin
 * Plugin Name:       Happy Giver Block
 * Plugin URI:        https://pintopsolutions.com/happy-giver-block
 * Description:       Make donations. Giver happily stays on your site. 
 * Version:           1.0.0
 * Author:            Arelthia Phillips
 * Author URI:        https://arelthiaphillips.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       hgb
 * Domain Path:       /languages
 */

if( ! defined( 'ABSPATH' ) ) exit;

class HappyGiverBlock {
    function __construct() {
        add_action( 'init', array($this, 'adminAssets'));
    }

    function adminAssets() {
        wp_register_style('happygiverblockcss', plugin_dir_url(__FILE__) . 'build/index.css' );
        wp_register_script('happygiverblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'), '13', false);
        register_block_type('happygiverblock/happy-giver', array(
            'editor_script' => 'happygiverblocktype',
            'editor_style' => 'happygiverblockcss',
            'render_callback' => array($this, 'theHTML') 
        ));
    }

    function theHTML($attributes) {
        $options = get_option( 'happygivergeneral' );
        if( !is_admin()){
            wp_dequeue_style( 'happy-giver' );
            wp_enqueue_script('happyGiverFrontEnd', plugin_dir_url(__FILE__). 'build/frontend.js', array('wp-element'), '2', false );
            wp_enqueue_style('happyGiverFrontEndStyles', plugin_dir_url(__FILE__). 'build/frontend.css');
        }

        ob_start(); ?>
        <div id="giver_message" style="display:none;"></div>
        <form id="happy-giver-type-form">
            <?php wp_nonce_field( 'submit-type-form', 'happy_giver_type_nonce_field' ); ?>
            <div class="happy-giver-update-me">
                <pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre>
                
            </div>
            <?php do_action('happy_giver_before_submit_button'); ?>
            <input type ="submit"  class="btn btn-success" id="happy-giver-submit-donation" value="Donate" tabindex="11">
            <?php echo (isset($options['happy_giver_footer'])? $options['happy_giver_footer'] : "") ?>
        </form>
        <?php return ob_get_clean();
    }
}

$happyGiverBlock = new HappyGiverBlock();