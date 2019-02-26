<?php

namespace Nrj\Controller;

use App\Service\MessageGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class DefaultController extends AbstractController
{

    private $twig;
    private $params;

    public function __construct()
    {
    }

    public function index(): Response
    {
        $message = New MessageGenerator();
        $messageReturn  =  $message->getHappyMessage();
        //return new Response('Accueil NRJ2 - Hello world');

        return $this->render('base.html.twig', [
            'message' => $messageReturn
        ]);
    }

    /**
     *
     * @Route("/test", name="hometest")
     */
    public function test(): Response
    {
        $message = New MessageGenerator();
        $messageReturn  =  $message->getHappyMessage();
        //return new Response('Accueil NRJ2 - Hello world');

        return $this->render('base.html.twig', [
            'message' => $messageReturn
        ]);

    }

}